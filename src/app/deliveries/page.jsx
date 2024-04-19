'use client'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchDeliveries } from './fetchDeliveries.js'
import { exportData } from '../exportData.js'
import Image from 'next/image.js'
import axios from 'axios'
import DeliveriesForm from '../components/DeliveriesForm.jsx'
import { fetchFamilies } from '../families/fetchFamilies.js'
import ButtonIcon from '../components/buttonIcon'
import Pagination from '@mui/material/Pagination'
import Select from 'react-select'

export default function DeliveriesList() {
	const [data, setData] = useState(null)
	const [filteredData, setFilteredData] = useState(null)
	const [names, setNames] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [expandedRow, setExpandedRow] = useState(null)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(20)

	const selectOpts = [
		{ label: '20', value: 20 },
		{ label: '40', value: 40 },
		{ label: '80', value: 80 }
	]

	const statesDelivery = [
		{ label: 'Entregado Todo', value: 'delivered' },
		{ label: 'Avisado', value: 'notified' },
		{ label: 'Próximo', value: 'next' }
	]

	const handleDeliveryStateChange = event => {
		const newState = event.target.value
		if (newState === '') {
			setFilteredData(data)
		} else if (newState === 'delivered') {
			setFilteredData(data.filter(delivery => delivery.state === 'delivered'))
		} else if (newState === 'notified') {
			setFilteredData(data.filter(delivery => delivery.state === 'notified'))
		} else if (newState === 'next') {
			setFilteredData(data.filter(delivery => delivery.state === 'next'))
		}
	}

	const totalPages = Math.ceil(data?.total_elements / perPage)

	const date = datetime => {
		const date = new Date(datetime)
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	}

	const handleShowProducts = index => {
		setExpandedRow(index === expandedRow ? null : index)
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
			alert('Error al importar los datos')
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data1 = await fetchDeliveries(perPage, (page - 1) * perPage)
				setData(data1.elements)
				let filteredDeliveries = data1.elements
				if (startDate && endDate) {
					filteredDeliveries = data.filter(delivery => {
						const deliveryDate = new Date(delivery.date)
						return (
							deliveryDate >= new Date(startDate) &&
							deliveryDate <= new Date(endDate)
						)
					})
				} else if (startDate && !endDate) {
					filteredDeliveries = data.filter(delivery => {
						const deliveryDate = new Date(delivery.date)
						return deliveryDate >= new Date(startDate)
					})
				} else if (!startDate && endDate) {
					filteredDeliveries = data.filter(delivery => {
						const deliveryDate = new Date(delivery.date)
						return deliveryDate <= new Date(endDate)
					})
				}
				setFilteredData(filteredDeliveries)
			} catch (error) {
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [page, perPage, startDate, endDate])

	const handleSearch = searchTerm => {
		if (!searchTerm) {
			setData(data)
			setFilteredData(data)
		} else {
			const filtered = data.filter(
				delivery =>
					names[delivery.family_id]
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					deliveryHaveProductName(delivery, searchTerm)
			)
			setFilteredData(filtered)
		}
	}

	const deliveryHaveProductName = (delivery, searchTerm) => {
		const result = false
		if (delivery.lines === undefined) return result
		else if (delivery.lines.length === 0) return result
		else if (delivery.lines.length > 0) {
			for (let i = 0; i < delivery.lines.length; i++) {
				if (delivery.lines[i].name === null) return result
				else if (
					delivery.lines[i].name
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				)
					return true
			}
		}
	}

	const handlePageChange = (event, value) => {
		setPage(value)
	}
	const handleSelect = opt => {
		setPerPage(opt?.value)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFamilies()
				const namesMap = {}
				data.elements.forEach(family => {
					namesMap[family.id] = family.name
				})
				setNames(namesMap)
			} catch (error) {
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	const handleDeleteDelivery = id => {
		const confirmed = window.confirm(
			'¿Seguro que deseas eliminar esta entrega?'
		)
		if (confirmed) {
			const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
			axios.delete(`${BASEURL}/cyc/delivery/${id}`, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const updatedData = data
			updatedData.elements = updatedData.elements.filter(
				delivery => delivery.id !== id
			)
			setData(updatedData)
		}
	}

	// Esto da panic, hay que arreglarlo
	const handleStatusChange = (event, index) => {
		// const newData = [...data]
		// newData[index].state = event.target.value
		// setData(newData)
		// const deliveryId = newData[index].id
		// const finalFormData = newData[index]
		// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		// // axios.patch(
		// // 	`${BASEURL}/cyc/delivery/${deliveryId}`,
		// // 	JSON.stringify(finalFormData),
		// // 	{
		// // 		headers: {
		// // 			'Content-Type': 'application/json'
		// // 		}
		// // 	}
		// // )
	}

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar
					handleClick={toggleModal}
					handleSearch={handleSearch}
					text="Añadir entrega"
					page="delivery"
					startDate={startDate}
					endDate={endDate}
					handleStartDateChange={e => setStartDate(e.target.value)}
					handleEndDateChange={e => setEndDate(e.target.value)}
					deliveryStates={statesDelivery}
					handleDeliveryStateChange={handleDeliveryStateChange}
				/>
				<div className="h-12 w-max flex flex-row">
					<button
						className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
						onClick={() => exportData(data, 'Entregas')}
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
				<div className="container p-10 flex flex-wrap gap-5 justify-center font-Varela items-center overflow-y-auto">
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
								{filteredData &&
									filteredData.map((delivery, index) => (
										<React.Fragment key={index}>
											<tr
												key={index}
												className="cursor-pointer"
												data-testid="delivery-data"
											>
												<td
													className="px-4 py-2 border-b"
													onClick={() => handleShowProducts(index)}
												>
													<Image src="/truck.svg" width={20} height={20} />
												</td>
												<td
													className="px-4 py-2 border-b text-center"
													onClick={() => handleShowProducts(index)}
												>
													{names[delivery.family_id]}
												</td>
												<td className="px-2 py-2 border-b text-center w-16">
													<select
														className={`rounded-lg border p-2 ${delivery.state === 'delivered' ? 'bg-red-100 text-red-700' : delivery.state === 'notified' ? 'bg-blue-100 text-blue-700' : delivery.state === 'next' ? 'bg-purple-100 text-purple-700' : ''}`}
														value={delivery.state}
														onChange={event => handleStatusChange(event, index)}
													>
														<option
															value="delivered"
															className="rounded-lg bg-red-100 p-2 text-red-700"
														>
															Entregado Todo
														</option>
														<option
															value="notified"
															className="rounded-lg bg-blue-100 p-2 text-blue-700"
														>
															Avisado
														</option>
														<option
															value="next"
															className="rounded-lg bg-purple-100 p-2 text-purple-700"
														>
															Próximo
														</option>
													</select>
												</td>
												<td
													className="px-4 py-2 border-b text-center"
													onClick={() => handleShowProducts(index)}
												>
													{date(delivery.date)}
												</td>
												<td
													className="px-4 py-2 border-b text-center"
													onClick={() => handleShowProducts(index)}
												>
													<button data-testid="show-delivery">
														{index === expandedRow ? (
															<Image
																src="/arrow-sm-down.svg"
																className="ml-2"
																width={15}
																height={15}
															></Image>
														) : (
															<Image
																src="/left-dropdown.svg"
																className="ml-2"
																width={15}
																height={15}
															></Image>
														)}
													</button>
												</td>
											</tr>
											{expandedRow === index && (
												<tr className="bg-gray-100">
													<td className="px-4 py-2 border-b">
														<Image src="/box.svg" width={20} height={20} />
													</td>
													<td colSpan="2" className="px-4 py-2 border-b">
														<p className="text-red-500 text-lg pl-10 mb-2">
															TOTAL A ENTREGAR
														</p>
														{delivery.lines.map((product, i) => (
															<p key={i} className="pl-14">
																{product.quantity} {product.name}
															</p>
														))}
													</td>
													<td
														colSpan="2"
														className="px-4 py-2 border-b text-center"
														data-testid="delete-update-buttons"
													>
														<ButtonIcon
															iconpath="/edit.svg"
															iconHeight={18}
															iconWidth={18}
															border={'border border-blue-500 mr-5'}
														/>
														<ButtonIcon
															iconpath="/cross.svg"
															iconHeight={18}
															iconWidth={18}
															handleClick={() =>
																handleDeleteDelivery(delivery.id)
															}
															color={'bg-red-500'}
														/>
													</td>
												</tr>
											)}
										</React.Fragment>
									))}
							</tbody>
						</table>
					</div>
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
			{showModal ? <DeliveriesForm onClickFunction={toggleModal} /> : null}
		</main>
	)
}
