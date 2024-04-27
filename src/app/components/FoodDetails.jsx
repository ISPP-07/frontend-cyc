'use client'
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import { fetchWarehouse } from '../food/warehouse/fetchWarehouse.js'
import ButtonIcon from './buttonIcon'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import FoodDetailsUpdate from './FoodDetailsUpdate.jsx'
import FoodDetailsView from './FoodDetailsView.jsx'

export default function FoodDetails({ food }) {
	const [almacen, setAlmacen] = useState(null)
	const [toggleEditView, setToggleEditView] = useState(false)
	const [confirmmationModal, setConfirmationModal] = useState(false)
	const [errors, setErrors] = useState({})
	const router = useRouter()

	function deleteFood() {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		const loader = document.getElementById('loader')
		loader.classList.remove('hidden')
		try {
			axios.delete(`${BASEURL}/cyc/warehouse/product/${food.id}`)
			router.push('/food')
		} catch (error) {
			return null
		}
	}

	useEffect(() => {
		fetchWarehouse(food.warehouse_id)
			.then(data => {
				setAlmacen(data)
			})
			.catch(error => {
				console.error('Error al cargar los datos:', error)
			})
	}, [])

	function editView() {
		setToggleEditView(!toggleEditView)
	}

	function toggleConfirmationModal() {
		setConfirmationModal(!confirmmationModal)
	}

	const validateForm = formData => {
		let valid = true
		const newError = {}

		const today = new Date()
		const date = new Date(formData.get('exp_date'))
		if (date < today) {
			valid = false
			newError.date =
				'La fecha de caducidad no puede ser anterior a la fecha actual'
		}

		if (formData.get('quantity') <= 0) {
			valid = false
			newError.quantity = 'La cantidad tiene que ser mayor a 0'
		}

		setErrors(newError)
		return valid
	}

	function onSubmit(event) {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		event.preventDefault()

		const formData = new FormData(event.target)

		const valid = validateForm(formData)

		if (!valid) {
			return
		}

		const jsonData = {
			name: formData.get('name') === '' ? food.name : formData.get('name'),
			exp_date:
				formData.get('exp_date') === ''
					? food.exp_date
					: formData.get('exp_date'),
			quantity:
				formData.get('quantity') === ''
					? food.quantity
					: formData.get('quantity'),
			update_exp_date: formData.get('exp_date') !== '',
			warehouse_id: food.warehouse_id,
			product_id: food.id
		}
		const datos = { products: [] }
		datos.products[0] = jsonData
		axios
			.patch(BASEURL + '/cyc/warehouse/product', datos)
			.then(_ => {
				window.location.reload()
			})
			.catch(error => {
				console.error('Error al enviar los datos:', error)
				alert(
					'Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.'
				)
			})
	}
	return (
		<div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300 w-[45	0px]">
			<div className="flex gap-3 justify-end items-center w-full">
				<ButtonIcon
					iconpath="/trash.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-red-500'}
					handleClick={toggleConfirmationModal}
					datatestid="deleteButton"
				/>
				<ButtonIcon
					iconpath="/edit.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-blue-500'}
					handleClick={editView}
					datatestid="editButton"
				/>
				<h1 className="text-center font-poppins text-2xl">
					{confirmmationModal ? (
						<strong>Borrar Producto</strong>
					) : !toggleEditView ? (
						<strong>Detalles del producto</strong>
					) : (
						<strong>Editar producto</strong>
					)}
				</h1>
			</div>
			<hr></hr>
			{confirmmationModal ? (
				<div data-testid="modalConfirmation">
					<h1 className="text-red-500 text-2xl text-center">¿Estas seguro?</h1>
					<div className="flex justify-between mt-4">
						<button
							data-testid="confirmButton"
							className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg mr-2"
							onClick={deleteFood}
						>
							Sí
						</button>
						<button
							className="border border-gray-300 text-black px-4 py-2 rounded-lg shadow-lg"
							onClick={toggleConfirmationModal}
						>
							No
						</button>
					</div>
				</div>
			) : food ? (
				toggleEditView ? (
					<FoodDetailsUpdate
						food={food}
						errors={errors}
						onSubmit={onSubmit}
						warehouse={food.warehouse}
					/>
				) : (
					<FoodDetailsView food={food} almacen={almacen} />
				)
			) : (
				<p>Cargando...</p>
			)}
		</div>
	)
}
