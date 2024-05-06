'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import ButtonText from '../../components/buttonText'
import ButtonIcon from '../../components/buttonIcon'
import { fetchFamily } from './fetchFamily'
import Image from 'next/image'
import axios from 'axios'
import Sidebar from '../../components/sidebar'
import Modal from '../[id]/editFamilyModal'
import { fetchDeliveryFamily } from './fetchDeliveryFamily'
import DeliveriesForm from '../../components/DeliveriesForm.jsx'
import { useRouter } from 'next/navigation'
import Tag from '../../components/tag'
import { createAxiosInterceptors } from '../../axiosConfig'
import addHiddenClass from '@/app/addHiddenClass'
import removeHiddenClass from '@/app/removeHiddenClass'

export function calculateAge(birthdate) {
	// Split the birthdate string into year, month, and day
	const parts = birthdate.split('-')
	const birthYear = parseInt(parts[0])
	const birthMonth = parseInt(parts[1])
	const birthDay = parseInt(parts[2])

	// Get the current date
	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth() + 1 // getMonth() returns zero-based month
	const currentDay = currentDate.getDate()

	// Calculate the age
	let age = currentYear - birthYear

	// Adjust age if birthday hasn't occurred yet this year
	if (
		currentMonth < birthMonth ||
		(currentMonth === birthMonth && currentDay < birthDay)
	) {
		age--
	}

	return age
}
function FamiliesIdPage({ params }) {
	const [showModalFamily, setShowModalFamily] = useState(false)
	const [showModalDelivery, setShowModalDelivery] = useState(false)
	const [showModalEditDelivery, setShowModalEditDelivery] = useState(false)
	const [delivery, setDelivery] = useState({})
	const [family, setFamily] = useState(null)
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	const [data, setData] = useState(null)
	const [expandedRow, setExpandedRow] = useState(null)
	const router = useRouter()

	const toggleModalFamily = () => {
		setShowModalFamily(!showModalFamily)
	}
	const toggleModalDelivery = () => {
		setShowModalDelivery(!showModalDelivery)
	}
	const toggleModalEditDelivery = () => {
		setShowModalEditDelivery(!showModalEditDelivery)
	}

	const date = datetime => {
		const date = new Date(datetime)
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	}

	const handleShowProducts = index => {
		setExpandedRow(index === expandedRow ? null : index)
	}

	useEffect(() => {
		addHiddenClass()
		createAxiosInterceptors()
		const fetchData = async () => {
			try {
				const family = await fetchFamily(params.id)
				// Handle passports
				const dniRegExp = /^\d{8}[A-Z]$/
				const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
				family.members.forEach(member => {
					if (
						!dniRegExp.test(member.nid) &&
						!nieRegExp.test(member.nid) &&
						member.nid !== null
					) {
						// Add P- to the passport number
						member.nid = `P-${member.nid}`
					}
				})
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
		const confirm = window.confirm(
			`¿Está seguro/a de querer eliminar los datos de la familia "${family.name}"?`
		)
		if (confirm) {
			removeHiddenClass()
			axios
				.delete(`${BASEURL}/cyc/family/${id}`)
				.then(response => {
					router.push('/families')
				})
				.catch(error => {
					console.log(error)
				})
		}
	}

	const handleDerecogniseFamily = (id, status) => {
		removeHiddenClass()
		axios
			.patch(
				`${BASEURL}/cyc/family/${id}`,
				JSON.stringify({
					derecognition_state: status
				}),
				{ headers: { 'Content-Type': 'application/json' } }
			)
			.then(response => {
				window.location.reload()
			})
			.catch(error => {
				console.log(error)
			})
	}

	const handleDeleteMember = (familyId, memberNid) => {
		removeHiddenClass()
		axios
			.delete(`${BASEURL}/cyc/family/${familyId}/person/${memberNid}`)
			.then(response => {
				console.log(response)
				window.location.reload()
			})
			.catch(error => {
				addHiddenClass()
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

		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

		axios.patch(
			`${BASEURL}/cyc/delivery/${deliveryId}`,
			JSON.stringify({ state: event.target.value }),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}

	const getAgeGroups = members => {
		// 0-3, 4-15, 16-45, 46-60, 60+
		const groups = []
		for (let index = 0; index < members.length; index++) {
			const member = members[index].date_birth
			if (calculateAge(member) < 4) {
				if (groups.find(e => e === '0-3')) {
					continue
				}
				groups.push('0-3')
			} else if (calculateAge(member) < 16) {
				if (groups.find(e => e === '4-15')) {
					continue
				}
				groups.push('0-3')
			} else if (calculateAge(member) < 46) {
				if (groups.find(e => e === '16-45')) {
					continue
				}
				groups.push('16-45')
			} else if (calculateAge(member) < 61) {
				if (groups.find(e => e === '46-60')) {
					continue
				}
				groups.push('46-60')
			} else {
				if (groups.find(e => e === '+60')) {
					continue
				}
				groups.push('+60')
			}
		}
		return groups
	}

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			{family && (
				<div className="w-full flex">
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
								</div>
							</div>
						</div>
						{family.derecognition_state === 'Suspended' && (
							<span className="font-Varela text-black text-l italic">
								Esta Familia se encuentra dada de baja
							</span>
						)}
						<div className="flex">
							{family.derecognition_state === 'Active' ? (
								<div>
									<ButtonText
										text="+ Nuevo reparto"
										color="bg-green-700"
										isRounded="true"
										px="3"
										handleClick={toggleModalDelivery}
										moreStyles={'mr-2'}
									/>
									<ButtonText
										text={'Dar de baja'}
										color="bg-yellow-600"
										isRounded="true"
										px="3"
										handleClick={() => {
											handleDerecogniseFamily(family.id, 'Suspended')
										}}
									/>
								</div>
							) : (
								<div>
									<ButtonText
										text={'Dar de alta'}
										color="bg-green-700"
										isRounded="true"
										px="3"
										className="shadow-2xl font-Varela text-sm text-white m-1"
										handleClick={() => {
											handleDerecogniseFamily(family.id, 'Active')
										}}
										moreStyles={'mr-2'}
									/>
									<ButtonText
										text={'Eliminar'}
										color="bg-red-500"
										isRounded="true"
										px="3"
										className="shadow-2xl font-Varela text-sm text-white m-1"
										handleClick={() => {
											handleDeleteFamily(family.id)
										}}
									/>
								</div>
							)}
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
						<div className='flex flex-col gap-3'>
							<div className='font-Varela text-gray-800'>
								<span className='font-Varela text-blue-500 font-bold mr-2'>
									Edades:
								</span>
								<div className="flex  border-2 border-color-black m-3 rounded-xl p-2">
									{getAgeGroups(family.members).map((group, index) => (
										<div className="flex m-1" key={index}>
											<Tag
												pathsvg={'/family.svg'}
												text={group}
												color={'bg-green-100'}
												textColor={'text-black'}
											/>
										</div>
									))}
								</div>
							</div>
							<p className='font-Varela text-gray-800'>
								<span className='font-Varela text-blue-500 font-bold mr-2'>
									Nº de personas:
								</span>
								{family.number_of_people}
							</p>
							<p className="font-Varela text-gray-800">
								<span className="font-Varela text-blue-500 font-bold mr-2">
									Hermandad o asociación:
								</span>
								{family.referred_organization || 'Sin asociación'}
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
									{family.observation || '--'}
								</span>
							</p>
							<div className='font-Varela text-gray-800'>
								<span className='font-Varela text-blue-500 font-bold mr-2'>
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
										<p>Apellido: {member.surname || '--'}</p>
										<p>Nacionalidad: {member.nationality || '--'}</p>
										<p>DNI: {member.nid || '--'}</p>
										<p>Edad: {calculateAge(member.date_birth)} años</p>
										<p>Fecha de nacimiento: {member.date_birth}</p>
										<p>
											Género:
											{member.gender &&
												(member.gender === 'Man' ? ' Hombre' : ' Mujer')}
											{!member.gender && '--'}
										</p>
										{member.food_intolerances.length !== 0 && (
											<div>
												<p>Intolerancias:</p>
												{member.food_intolerances.map((intolerance, index2) => (
													<p key={index2}>{`- ${intolerance}`}</p>
												))}
											</div>
										)}
										{member.family_head && <p>Cabeza de familia</p>}
										<p>
											Discapacidad: {member.functional_diversity ? 'Sí' : 'No'}
										</p>
										<p>Indigente: {member.homeless ? 'Sí' : 'No'}</p>
									</div>
								))}
							</div>
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
																handleClick={() => {
																	setDelivery(delivery)
																	toggleModalEditDelivery()
																}}
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
				<DeliveriesForm
					onClickFunction={toggleModalDelivery}
					familyId={family.id}
				/>
			) : null}
			{showModalEditDelivery ? (
				<DeliveriesForm
					onClickFunction={toggleModalEditDelivery}
					familyId={family.id}
					delivery={delivery}
				/>
			) : null}
		</main>
	)
}
export default FamiliesIdPage
