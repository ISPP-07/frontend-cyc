'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import ButtonText from '../../components/buttonText'
import ButtonIcon from '../../components/buttonIcon'
import { fetchFamily } from './fetchFamily'
import Image from 'next/image'
import axios from 'axios'
import Sidebar from '../../components/sidebar'
import Modal from '../[id]/editFamilyModal'
import { fetchDeliveryFamily } from './fetchDeliveryFamily'
import DeliveriesForm from '../../components/DeliveriesForm.jsx'

export default function FamiliesIdPage({ params }) {
	const [showModalFamily, setShowModalFamily] = useState(false)
	const [showModalDelivery, setShowModalDelivery] = useState(false)
	const [family, setFamily] = useState(null)
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	const [data, setData] = useState(null)
	const [expandedRow, setExpandedRow] = useState(null)

	const toggleModalFamily = () => {
		setShowModalFamily(!showModalFamily)
	}
	const toggleModalDelivery = () => {
		setShowModalDelivery(!showModalDelivery)
	}

	const date = datetime => {
		const date = new Date(datetime)
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	}

	const handleShowProducts = index => {
		setExpandedRow(index === expandedRow ? null : index)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const family = await fetchFamily(params.id)
				setFamily(family)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	const handleDeleteFamily = id => {
		axios
			.delete(`${BASEURL}/cyc/family/${id}`)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	const handleDeleteMember = (familyId, memberNid) => {
		axios
			.delete(`${BASEURL}/cyc/family/${familyId}/person/${memberNid}`)
			.then(response => {
				console.log(response)
				window.location.reload()
			})
			.catch(error => {
				console.log(error)
			})
	}
	useEffect(() => {
		const fetchEntregas = async () => {
			try {
				const data = await fetchDeliveryFamily(params.id)
				setData(data)
			} catch (error) {
				console.error('Error al cargar los datos de entregas:', error)
				alert(
					'Se produjo un error al cargar los datos de entregas. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchEntregas()
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
			const updatedData = data.filter(delivery => delivery.id !== id)
			setData(updatedData)
		}
	}

	const handleStatusChange = (event, index) => {
		const newData = [...data]
		newData[index].state = event.target.value
		setData(newData)

		const deliveryId = newData[index].id // Asegúrate de tener una propiedad id en tu objeto de entrega

		const finalFormData = newData[index]
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

		axios.patch(
			`${BASEURL}/cyc/delivery/${deliveryId}`,
			JSON.stringify(finalFormData),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			{family && (
				<div className="w-full h-full flex">
					<div className="flex flex-col gap-4 h-full w-[500px] bg-white border border-solid shadow-xl p-5 px-8 sticky top-0">
						<div className="flex items-center gap-4">
							<Image
								alt="imagen-familia"
								src="/family-2.svg"
								width={50}
								height={50}
							></Image>
							<div className="flex items-center justify-between w-full">
								<span className="font-Varela text-black text-2xl font-bold">
									{family.name}
								</span>
								<div className="flex items-center gap-2">
									<ButtonIcon
										iconpath="/edit.svg"
										iconHeight={18}
										iconWidth={18}
										border={'border border-blue-500'}
										handleClick={toggleModalFamily}
									/>
									<Link href="/families">
										<ButtonIcon
											iconpath="/cross.svg"
											iconHeight={18}
											iconWidth={18}
											color={'bg-yellow-500'}
											handleClick={() => {
												handleDeleteFamily(family.id)
											}}
										/>
									</Link>
								</div>
							</div>
						</div>
						<div>
							<ButtonText
								text="+ Nuevo reparto"
								color="bg-green-700"
								isRounded="true"
								px="3"
								className="shadow-2xl font-Varela text-sm text-white"
								handleClick={toggleModalDelivery}
							/>
						</div>
						<hr></hr>
						<div className="flex items-center gap-3">
							<Image
								alt="imagen-telefono"
								src="/phone.svg"
								width={20}
								height={20}
							></Image>
							<p className="font-Varela text-gray-800 text-base">
								{family.phone}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<Image
								alt="imagen-dirección"
								src="/address.svg"
								width={20}
								height={20}
							></Image>
							<p className="font-Varela text-gray-800 text-base">
								{family.address}
							</p>
						</div>
						<hr></hr>
						<div className="flex flex-col gap-3">
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold mr-2">
									Edades:
								</span>
								{family.ages}
							</p>
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold mr-2">
									Nº de personas:
								</span>
								{family.number_of_people}
							</p>
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold mr-2">
									Hermandad o asociación:
								</span>
								{family.referred_organization}
							</p>
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold mr-2">
									Próxima renovación:
								</span>
								{family.next_renewal_date}{' '}
							</p>
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold">
									Observaciones:
								</span>
								<span className="font-Varela text-gray-800 mt-2">
									{family.observation}
								</span>
							</p>
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold mr-2">
									Miembros:
								</span>
								{family.members.map((member, index) => (
									<div
										key={index}
										className="flex flex-col border-2 border-color-black m-3 rounded-xl p-2"
									>
										<div className="flex items-center justify-between w-full">
											<p>Nombre: {member.name}</p>
											{!member.family_head && (
												<ButtonIcon
													iconpath="/cross.svg"
													iconHeight={8}
													iconWidth={8}
													color={'bg-yellow-500'}
													handleClick={() => {
														handleDeleteMember(family.id, member.nid)
													}}
												></ButtonIcon>
											)}
										</div>
										<p>Apellido: {member.surname}</p>
										<p>Nacionalidad: {member.nationality}</p>
										<p>DNI: {member.nid}</p>
										<p>Fecha de nacimiento: {member.date_birth}</p>
										<p>
											Género: {member.gender === 'Man' ? 'Hombre' : 'Mujer'}
										</p>
										{member.family_head && <p>Cabeza de familia</p>}
										<p>
											Discapacidad: {member.functional_diversity ? 'Sí' : 'No'}
										</p>
										<p>Indigente: {member.homeless ? 'Sí' : 'No'}</p>
									</div>
								))}
							</p>
						</div>
					</div>
					<div className="container p-10 flex flex-wrap gap-5 justify-center font-Varela overflow-y-auto">
						<div className="w-full overflow-x-auto">
							<span className="font-Varela text-black text-2xl font-bold">
								Entregas
							</span>
							<table className="table-auto w-full">
								<thead>
									<tr>
										<th className="px-4 py-2 border-b"></th>
										<th className="px-4 py-2 border-b text-center">Estado</th>
										<th className="px-4 py-2 border-b text-center">Fecha</th>
										<th className="px-4 py-2 border-b"></th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.map((delivery, index) => (
											<React.Fragment key={index}>
												<tr key={index} className="cursor-pointer">
													<td
														className="px-4 py-2 border-b"
														onClick={() => handleShowProducts(index)}
													>
														<Image src="/truck.svg" width={20} height={20} />
													</td>
													<td className="px-2 py-2 border-b text-center w-16">
														<select
															className={`rounded-lg border p-2 ${delivery.state === 'delivered' ? 'bg-red-100 text-red-700' : delivery.state === 'notified' ? 'bg-blue-100 text-blue-700' : delivery.state === 'next' ? 'bg-purple-100 text-purple-700' : ''}`}
															value={delivery.state}
															onChange={event =>
																handleStatusChange(event, index)
															}
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
														<button>
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
														<td className="px-4 py-2 border-b text-center">
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
																data-testid="delete-button"
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
				</div>
			)}
			{showModalFamily ? (
				<Modal closeModal={toggleModalFamily} id={params.id} />
			) : null}
			{showModalDelivery ? (
				<DeliveriesForm onClickFunction={toggleModalDelivery} />
			) : null}
		</main>
	)
}
