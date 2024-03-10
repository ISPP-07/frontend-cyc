'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import CardFood from '../components/cardFood'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import AddElementForm from '../components/AddElementForm'
import { fetchDataFoods } from './fetch.jsx'
import axios from 'axios'
import Image from 'next/image'
import exportData from '../exportData.js'

export default function FoodPage() {
	const data = fetchDataFoods()
	const [stateModal, setStateModal] = useState(false)

	const toggleModal = () => {
		setStateModal(!stateModal)
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

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar text="Añadir elemento" handleClick={toggleModal} />
				<div className="h-12 w-max flex flex-row">
					<button
						data-testid="export-button"
						className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
						onClick={() => exportData(data, 'Comidass')}
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
					<Suspense fallback={<div>Cargando..</div>}>
						{data.then(res =>
							res.map(food => <CardFood key={food.id} food={food} />)
						)}
					</Suspense>
				</div>
			</div>
			{stateModal ? <AddElementForm onClickFunction={toggleModal} /> : null}
		</main>
	)
}
