'use client'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../../components/sidebar.jsx'
import Searchbar from '../../components/searchbar.jsx'
import { exportData } from '../../exportData.js'
import ButtonIcon from '../../components/buttonIcon'
import Image from 'next/image.js'
import axios from 'axios'
import { fetchDataWarehouse } from './fetchDataWarehouse.js'
import WarehouseForm from '../../components/WarehouseForm.jsx'

export default function WarehouseList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [selectedWarehouse, setSelectedWarehouse] = useState(null)

	const handleUpdateWarehouse = warehouse => {
		setSelectedWarehouse(warehouse)
		setShowModal(true)
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

	const toggleModal = () => {
		setShowModal(!showModal)
		setSelectedWarehouse(null)
	}

	const handleDeleteWarehouse = id => {
		const confirmed = window.confirm(
			'¿Seguro que deseas eliminar este almacén?'
		)
		if (confirmed) {
			const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
			axios
				.delete(`${BASEURL}/cyc/warehouse/${id}`, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(() => {
					const updatedData = data.filter(warehouse => warehouse.id !== id)
					setData(updatedData)
				})
				.catch(error => {
					console.error('Error al eliminar el almacén:', error)
					if (error.response && error.response.status === 404) {
						alert(
							'No se encontró el almacén que deseas eliminar. Por favor, inténtalo de nuevo.'
						)
					} else {
						alert(
							'Se produjo un error al eliminar el almacén. Por favor, inténtalo de nuevo.'
						)
					}
				})
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchDataWarehouse()
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

	return (
		<main className="flex w-full h-screen">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} text="Añadir almacén" />
				<div className="h-12 w-max flex flex-row">
					<button
						className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
						onClick={() => exportData(data, 'Almacenes')}
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
					<div className="w-full overflow-x-auto">
						<table className="table-auto w-full">
							<thead>
								<tr>
									<th className="px-4 py-2 border-b"></th>
									<th className="px-4 py-2 border-b text-center">Nombre</th>
									<th className="px-4 py-2 border-b"></th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((warehouse, index) => (
										<React.Fragment key={index}>
											<tr key={index} data-testid="warehouse-data">
												<td className="px-4 py-2 border-b">
													<Image src="/box.svg" width={20} height={20} />
												</td>
												<td className="px-4 py-2 border-b text-center">
													{warehouse.name}
												</td>
												<td className="px-4 py-2 border-b text-center">
													<ButtonIcon
														iconpath="/edit.svg"
														iconHeight={18}
														iconWidth={18}
														handleClick={() => handleUpdateWarehouse(warehouse)}
														border={'border border-blue-500 mr-5'}
													/>
													<ButtonIcon
														iconpath="/cross.svg"
														iconHeight={18}
														iconWidth={18}
														handleClick={() =>
															handleDeleteWarehouse(warehouse.id)
														}
														color={'bg-red-500'}
														data-testid="delete-button"
													/>
												</td>
											</tr>
										</React.Fragment>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{showModal ? (
				<WarehouseForm
					onClickFunction={toggleModal}
					warehouseToUpdate={selectedWarehouse}
				/>
			) : null}
		</main>
	)
}
