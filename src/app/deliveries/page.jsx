'use client'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchDeliveries } from './fetchDeliveries.js'
import exportData from '../exportData.js'
import Image from 'next/image.js'
import axios from 'axios'
import DeliveriesForm from '../components/DeliveriesForm.jsx'

export default function DeliveriesList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const [selectedDelivery, setSelectedDelivery] = useState(null)

	const handleShowProducts = index => {
		setSelectedDelivery(data[index])
	}

	const handleCloseModal = () => {
		setSelectedDelivery(null)
	}

	const toggleModal = () => {
		setShowModal(!showModal)
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
				const data = await fetchDeliveries()
				setData(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	const handleStatusChange = (event, index) => {
		const newData = [...data]
		newData[index].state = event.target.value
		setData(newData)
	}

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Añadir entrega" />
				<div className="h-12 w-max flex flex-row">
					<button
						className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
						onClick={() => exportData(data, 'Deliveries')}
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
				<div className="container p-10 flex flex-wrap gap-5 justify-center font-Varela items-center">
					<div className="w-full overflow-x-auto">
						<table className="table-auto w-full">
							<thead>
								<tr>
									<th className="px-4 py-2 border-b"></th>
									<th className="px-4 py-2 border-b text-center">Familia</th>
									<th className="px-4 py-2 border-b text-center">Estado</th>
									<th className="px-4 py-2 border-b text-center">Fecha</th>
									<th className="px-4 py-2 border-b"></th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((family, index) => (
										<tr key={index}>
											<td className="px-4 py-2 border-b">
												<Image src="/truck.svg" width={20} height={20} />
											</td>
											<td className="px-4 py-2 border-b text-center">
												{family.family}
											</td>
											<td className="px-4 py-2 border-b text-center">
												<select
													className={`rounded-lg border p-2 ${family.state === 'Entregado Todo' ? 'bg-red-100 text-red-700' : family.state === 'Avisado' ? 'bg-blue-100 text-blue-700' : family.state === 'Próximo' ? 'bg-purple-100 text-purple-700' : ''}`}
													value={family.state}
													onChange={event => handleStatusChange(event, index)}
												>
													<option
														value="Entregado Todo"
														className="rounded-lg bg-red-100 p-2 text-red-700"
													>
														Entregado Todo
													</option>
													<option
														value="Avisado"
														className="rounded-lg bg-blue-100 p-2 text-blue-700"
													>
														Avisado
													</option>
													<option
														value="Próximo"
														className="rounded-lg bg-purple-100 p-2 text-purple-700"
													>
														Próximo
													</option>
												</select>
											</td>
											<td className="px-4 py-2 border-b text-center">
												{family.date}
											</td>
											<td className="px-4 py-2 border-b text-center">
												<button
													onClick={() => handleShowProducts(index)}
													className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
												>
													-
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					{selectedDelivery && (
						<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
							<div className="bg-white p-4 rounded shadow">
								<h2 className="text-lg font-semibold mb-2">
									Productos para {selectedDelivery.family}
								</h2>
								<ul>
									{selectedDelivery.productos.map((producto, index) => (
										<li key={index}>
											{producto.name}: {producto.cantidad}
										</li>
									))}
								</ul>
								<button
									onClick={handleCloseModal}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
								>
									Cerrar
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{showModal ? <DeliveriesForm onClickFunction={toggleModal} /> : null}
		</main>
	)
}
