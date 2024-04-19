'use client'
import Link from 'next/link'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchFamilies } from './fetchFamilies.js'
import { exportData } from '../exportData.js'
import Image from 'next/image.js'
import axios from 'axios'
import CardFamily from '../components/cardFamily.jsx'
import Modal from '../families/modal.jsx'
import Pagination from '@mui/material/Pagination'
import Select from 'react-select'

export default function FamiliesList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(20)

	const selectOpts = [
		{ label: '20', value: 20 },
		{ label: '40', value: 40 },
		{ label: '80', value: 80 }
	]
	// change when backend retrieval is updated
	const totalPages = Math.ceil(data?.total_elements / perPage)

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	const handleExport = async () => {
		try {
			const familyData = await fetchFamilies()
			exportData(familyData.elements, 'Familias', {
				name: 'Nombre',
				phone: 'Teléfono',
				address: 'Dirección',
				referred_organization: 'Hermandad',
				next_renewal_date: 'Fecha de renovación',
				derecognition_state: 'Estado',
				observation: 'Observaciones',
				number_of_people: 'Número de personas',
				members: 'Miembros'
			})
		} catch (error) {
			console.error('Error al cargar los datos para la exportación:', error)
			alert(
				'Se produjo un error al cargar los datos para la exportación. Por favor, inténtalo de nuevo.'
			)
		}
	}
	const handleFileChange = async event => {
		const selectedFile = event.target.files[0]
		try {
			const formData = new FormData()
			formData.append('file', selectedFile)
			await axios.post('url/de/import', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			alert('Datos importados correctamente')
		} catch (error) {
			console.error(error)
			alert('Error al importar los datos')
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFamilies(perPage, (page - 1) * perPage)
				setData(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [page, perPage])

	const handlePageChange = (event, value) => {
		setPage(value)
	}
	const handleSelect = opt => {
		setPerPage(opt?.value)
	}
	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Dar de alta" />
				<div className="h-12 w-max flex flex-row">
					<button
						className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
						onClick={() => handleExport()}
					>
						<Image
							src="/excel.svg"
							className="ml-2"
							width={15}
							height={15}
						></Image>
					</button>
					<label
						htmlFor="file"
						className="bg-green-400 w-32 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm"
					>
						Importar datos
					</label>
					<input
						type="file"
						id="file"
						onChange={handleFileChange}
						style={{ display: 'none' }}
						accept=".xls"
					/>
				</div>
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					<Suspense fallback={<div>Cargando...</div>}>
						{data &&
							data.elements.map(family => (
								<Link href={`/families/${family.id}`} key={family.id}>
									<CardFamily key={family.id} family={family} />
								</Link>
							))}
					</Suspense>
				</div>
				<div>
					<Pagination
						count={totalPages}
						initialpage={1}
						onChange={handlePageChange}
						className="flex flex-wrap justify-center items-center"
					/>
					<div className="flex justify-center items-center m-2">
						<p>Número de elementos:</p>
						<Select
							options={selectOpts}
							defaultValue={{ label: '20', value: 20 }}
							isSearchable={false}
							isClearable={false}
							onChange={handleSelect}
							className="m-2"
						/>
					</div>
				</div>
			</div>
			{showModal ? <Modal closeModal={toggleModal} /> : null}
		</main>
	)
}
