'use client'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../../components/sidebar.jsx'
import Searchbar from '../../components/searchbar.jsx'
import ButtonIcon from '../../components/buttonIcon'
import Image from 'next/image.js'
import axios from 'axios'
import { fetchDataWarehouse } from './fetchDataWarehouse.js'
import WarehouseForm from '../../components/WarehouseForm.jsx'
import { createAxiosInterceptors } from '@/app/axiosConfig.js'
import removeHiddenClass from '@/app/removeHiddenClass.js'
import addHiddenClass from '@/app/addHiddenClass.js'

export default function WarehouseList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [selectedWarehouse, setSelectedWarehouse] = useState(null)

	const toggleModal = () => {
		setShowModal(!showModal)
		setSelectedWarehouse(null)
	}

	const handleDeleteWarehouse = id => {
		const confirmed = window.confirm(
			'¿Seguro que deseas eliminar este almacén?'
		)
		if (confirmed) {
			removeHiddenClass()
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
				.finally(() => {
					addHiddenClass()
				})
		}
	}

	useEffect(() => {
		createAxiosInterceptors()
		const fetchData = async () => {
			try {
				const data = await fetchDataWarehouse()
				setData(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			} finally {
				addHiddenClass()
			}
		}
		fetchData()
	}, [])

	return (
		<main className='flex w-full h-screen'>
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className='w-full h-full flex flex-col items-center'>
				<Searchbar handleClick={toggleModal} text='Añadir almacén' />
				<div className='container p-10 flex flex-wrap gap-5 justify-center items-center'>
					<div className='w-full overflow-x-auto'>
						<table className='table-auto w-full'>
							<thead>
								<tr>
									<th className='px-4 py-2 border-b'></th>
									<th className='px-4 py-2 border-b text-center'>Nombre</th>
									<th className='px-4 py-2 border-b'></th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((warehouse, index) => (
										<React.Fragment key={index}>
											<tr key={index} data-testid='warehouse-data'>
												<td className='px-4 py-2 border-b'>
													<Image src='/box.svg' width={20} height={20} />
												</td>
												<td className='px-4 py-2 border-b text-center'>
													{warehouse.name}
												</td>
												<td className='px-4 py-2 border-b text-center'>
													{/*
													<ButtonIcon
														iconpath='/edit.svg'
														iconHeight={18}
														iconWidth={18}
														handleClick={() => handleUpdateWarehouse(warehouse)}
														border={'border border-blue-500 mr-5'}
													/>
                                                    */}
													<ButtonIcon
														iconpath='/cross.svg'
														iconHeight={18}
														iconWidth={18}
														handleClick={() =>
															handleDeleteWarehouse(warehouse.id)
														}
														color={'bg-red-500'}
														data-testid='delete-button'
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
