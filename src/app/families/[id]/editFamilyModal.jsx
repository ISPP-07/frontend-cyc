/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Formik, FieldArray, Field, Form } from 'formik'
import { fetchFamily } from './fetchFamily'
import CreatableSelect from 'react-select/creatable'

export default function Modal({
	closeModal = () => {
		window.location.href = '/families'
	},
	id
}) {
	const router = useRouter()
	const [family, setFamily] = useState(null)
	const [underageMembers, setUnderageMembers] = useState([])
	const [errors, setErrors] = useState({})

	const intolerances = [
		{ label: 'Leche', value: 'Leche' },
		{ label: 'Huevo', value: 'Huevo' },
		{ label: 'Frutos secos', value: 'Frutos secos' },
		{ label: 'Gluten', value: 'Gluten' },
		{ label: 'Mariscos', value: 'Mariscos' },
		{ label: 'Pescado', value: 'Pescado' },
		{ label: 'Soja', value: 'Soja' },
		{ label: 'Semillas', value: 'Semillas' },
		{ label: 'Cacahuate (Maní)', value: 'Cacahuate (Maní)' },
		{ label: 'Sulfitos', value: 'Sulfitos' },
		{ label: 'Apio', value: 'Apio' },
		{ label: 'Moluscos', value: 'Moluscos' },
		{ label: 'Sulfuroso', value: 'Sulfuroso' },
		{
			label: 'Glutamato monosódico (MSG)',
			value: 'Glutamato monosódico (MSG)'
		},
		{ label: 'Lactosa', value: 'Lactosa' }
	]

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFamily(id)
				// Handle passports
				const dniRegExp = /^\d{8}[A-Z]$/
				const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
				data.members.forEach(member => {
					if (
						!dniRegExp.test(member.nid) &&
						!nieRegExp.test(member.nid) &&
						member.nid !== null
					) {
						// Add P- to the passport number
						member.nid = `P-${member.nid}`
					}
				})
				setFamily(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	// Update underageMembers when family changes
	useEffect(() => {
		if (family) {
			const newUnderageMembers = []
			family.members.forEach((member, index) => {
				const birthDate = new Date(member.date_birth)
				const today = new Date()
				const age = today.getFullYear() - birthDate.getFullYear()
				if (age < 18) {
					newUnderageMembers.push(index)
				}
			})
			setUnderageMembers(newUnderageMembers)
		}
	}, [family])

	return (
		<div>
			{family && (
				<div className='fixed bg-gray-600 bg-opacity-50 top-0 left-0 h-full w-full flex items-center justify-center z-50 '>
					<div className='p-10 border shadow-lg rounded-xl bg-white overflow-y-auto max-h-[600px]'>
						<div className='flex justify-end'>
							<button
								className='bg-red-500 text-white text-xl rounded-full shadow-lg w-[30px] h-[30px] mb-3'
								onClick={closeModal}
							>
								X
							</button>
						</div>
						<p className='flex justify-center text-black'>
							Información de la familia
						</p>
						<Formik
							initialValues={{
								name: family.name,
								phone: family.phone,
								address: family.address,
								referred_organization: family.referred_organization,
								observation: family.observation,
								members: family.members.map(member => ({
									name: member.name,
									surname: member.surname,
									nationality: member.nationality,
									nid: member.nid,
									gender: member.gender,
									date_birth: member.date_birth,
									food_intolerances: member.food_intolerances,
									family_head: member.family_head,
									functional_diversity: member.functional_diversity,
									homeless: member.homeless
								}))
							}}
							onSubmit={async (values, actions) => {
								try {
									// Validation
									let isValid = true
									const errors = {}

									if (values.members.length < 1) {
										isValid = false
										alert('Debe haber al menos un miembro en la familia')
									} else {
										let familyHead = false
										values.members.forEach((member, index) => {
											if (member.family_head) {
												if (familyHead) {
													isValid = false
													alert('No puede haber más de un cabeza de familia')
												} else {
													familyHead = true
												}
											}
										})
										if (!familyHead) {
											isValid = false
											alert('Debe haber un cabeza de familia')
										}
									}

									const contactPhoneRegExp = /^\d{0,15}$/

									if (!contactPhoneRegExp.test(values.phone)) {
										isValid = false
										errors.phone = 'El teléfono no es válido'
									}

									const today = new Date()
									const nextRenewalDate = new Date(values.next_renewal_date)

									if (today > nextRenewalDate) {
										isValid = false
										errors.next_renewal_date =
											'La fecha de renovación no puede ser pasada'
									}

									const dniRegExp = /^\d{8}[A-Z]$/
									const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
									// Passports start with P- and then any number of digits and/or letters
									const passportRegExp = /^P-\w+$/
									values.members.forEach((member, index) => {
										// This is a XOR operation, if one of the three conditions is true, the result is true
										if (
											!dniRegExp.test(member.nid) &&
											!nieRegExp.test(member.nid) &&
											!passportRegExp.test(member.nid) &&
											!underageMembers.includes(index)
										) {
											isValid = false
											errors[`nid-${index}`] =
												'El DNI/NIE/Pasaporte no es válido'
										} else if (dniRegExp.test(member.nid)) {
											// Validate the letter of the DNI
											const dni = member.nid
											const letter = dni.charAt(dni.length - 1)
											const number = dni.slice(0, -1)
											const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
											const letterCorrect = letters.charAt(number % 23)
											if (letter !== letterCorrect) {
												isValid = false
												errors[`nid-${index}`] =
													'El DNI/NIE/Pasaporte no es válido'
											}
										} else if (passportRegExp.test(member.nid)) {
											// Remove P-
											member.nid = member.nid.slice(2)
											member.passport = true
										}

										const birthDate = new Date(member.date_birth)
										const today = new Date()

										if (today < birthDate) {
											isValid = false
											errors[`date_birth-${index}`] =
												'La fecha de nacimiento no puede ser futura'
										}
										// Workaround for gender not being inserted after child then adult
										values.members[index].gender = document.getElementById(
											`members.${index}.gender`
										).value
										if (values.members[index].gender === 'Nada') {
											isValid = false
											errors[`gender-${index}`] = 'Seleccione un género'
										}
									})

									if (!isValid) {
										setErrors(errors)
										return
									}

									// Create json object
									const json = {
										name: values.name,
										phone: values.phone,
										address: values.address,
										referred_organization: values.referred_organization,
										observation: values.observation,
										number_of_people: values.members.length,
										next_renewal_date: values.next_renewal_date,
										derecognition_state: values.derecognition_state,
										informed: values.informed,
										members: values.members.map((member, index) => {
											if (underageMembers.includes(index)) {
												return {
													date_birth: member.date_birth,
													type: 'Child',
													nationality: member.nationality,
													gender: member.gender,
													food_intolerances: member.food_intolerances,
													functional_diversity: member.functional_diversity,
													homeless: member.homeless,
													family_head: member.family_head
												}
											} else {
												return member
											}
										})
									}

									// Patch
									const response = await axios
										.patch(
											process.env.NEXT_PUBLIC_BASE_URL +
												`/cyc/family/${family.id}`,
											json,
											{
												headers: {
													'Content-Type': 'application/json'
												}
											}
										)
										.then(function (_) {
											// Navigate to the newly created family
											router.push('/families/' + family.id)
											window.location.reload()
										})
										.catch(function (error) {
											alert(
												`Ha habido un error al crear la nueva familia: ${error.response.data.detail}`
											)
										})
									console.log(response.data) // Log the response from the server
									actions.setSubmitting(false)
									// Navigate to a success page or handle success message
								} catch (error) {
									console.error('Error:', error)
									actions.setSubmitting(false)
									// Handle error message or display an error notification
								}
							}}
						>
							{({ values, setFieldValue }) => (
								<Form className='flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2'>
									<fieldset className='flex flex-col w-full md:w-5/12'>
										<label htmlFor='name' className='text-black'>
											Nombre <span className='text-red-500'>*</span>
										</label>
										<Field
											className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
											type='text'
											placeholder='Nombre'
											id='name'
											name='name'
											required={true}
										/>
									</fieldset>
									<fieldset className='flex flex-col w-full md:w-5/12'>
										<label htmlFor='phone' className='text-black'>
											Teléfono <span className='text-red-500'>*</span>
										</label>
										<Field
											className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
											type='text'
											placeholder='Teléfono'
											pattern='[0-9]{9}'
											id='phone'
											name='phone'
											required={true}
										/>
										{errors.phone && (
											<span className='text-red-500'>{errors.phone}</span>
										)}
									</fieldset>
									<fieldset className='flex flex-col w-full md:w-5/12'>
										<label htmlFor='address' className='text-black'>
											Dirección <span className='text-red-500'>*</span>
										</label>
										<Field
											className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
											type='text'
											placeholder='Dirección'
											id='address'
											name='address'
											required={true}
										/>
									</fieldset>
									<fieldset className='flex flex-col w-full md:w-5/12'>
										<label htmlFor='association' className='text-black'>
											Hermandad o Asociación
										</label>
										<Field
											className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
											type='text'
											placeholder='Hermandad o Asociación'
											id='referred_organization'
											name='referred_organization'
										/>
									</fieldset>
									<fieldset className='flex flex-col w-full md:w-5/12'>
										<label htmlFor='observations' className='text-black'>
											Observaciones
										</label>
										<Field
											className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2'
											type='textarea'
											placeholder='Observaciones'
											id='observation'
											name='observation'
										/>
									</fieldset>
									<fieldset className='flex flex-col w-full md:w-5/12'>
										<label htmlFor='next_renewal_date' className='text-black'>
											Fecha de renovación{' '}
											<span className='text-red-500'>*</span>
										</label>
										<Field
											className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
											type='date'
											placeholder='Fecha de renovación'
											id='next_renewal_date'
											name='next_renewal_date'
											defaultValue={family.next_renewal_date}
										/>
									</fieldset>
									{errors.next_renewal_date && (
										<span className='text-red-500'>
											{errors.next_renewal_date}
										</span>
									)}

									<hr className='w-4/5 border-gray-500 mt-3 mb-3'></hr>
									<p>Miembros de la familia</p>
									<FieldArray name='members'>
										{({ push, remove }) => (
											<div>
												{values.members.map((member, index) => (
													<div
														key={index}
														className='flex ml-8 flex-col md:flex-row md:flex-wrap justify-center gap-x-16 content-center mt-2'
													>
														<p className='flex w-96 justify-center ml-12'>
															Miembro {index + 1}
														</p>
														<button
															onClick={() => remove(index)}
															className='bg-red-500 text-white text-sm rounded-full shadow-lg w-[20px] h-[20px] mb-3'
														>
															X
														</button>
														<fieldset className='flex flex-col w-full md:w-5/12'>
															<label
																htmlFor={`members.${index}.name`}
																className='text-black'
															>
																Nombre
															</label>
															<Field
																className={
																	underageMembers.includes(index)
																		? 'flex items-center border-2 rounded-xl border-gray-200 p-1 pl-2 w-full bg-gray-200'
																		: 'flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
																}
																type='text'
																placeholder='Nombre'
																id={`members.${index}.name`}
																name={`members.${index}.name`}
																required={!underageMembers.includes(index)}
																disabled={underageMembers.includes(index)}
															/>
														</fieldset>
														<fieldset className='flex flex-col w-full md:w-5/12'>
															<label
																htmlFor={`members.${index}.surname`}
																className='text-black'
															>
																Apellido
															</label>
															<Field
																className={
																	underageMembers.includes(index)
																		? 'flex items-center border-2 rounded-xl border-gray-200 p-1 pl-2 w-full bg-gray-200'
																		: 'flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
																}
																type='text'
																placeholder='Apellido'
																id={`members.${index}.surname`}
																name={`members.${index}.surname`}
																required={!underageMembers.includes(index)}
																disabled={underageMembers.includes(index)}
															/>
														</fieldset>
														<fieldset className='flex flex-col w-full md:w-5/12'>
															<label
																htmlFor={`members.${index}.nationality`}
																className='text-black'
															>
																Nacionalidad
															</label>
															<Field
																className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
																type='text'
																placeholder='Nacionalidad'
																id={`members.${index}.nationality`}
																name={`members.${index}.nationality`}
																required={true}
																defaultValue={'España'}
															/>
														</fieldset>
														<fieldset className='flex flex-col w-full md:w-5/12'>
															<label
																htmlFor={`members.${index}.nid`}
																className='text-black'
															>
																DNI
															</label>
															<Field
																className={
																	underageMembers.includes(index)
																		? 'flex items-center border-2 rounded-xl border-gray-200 p-1 pl-2 w-full bg-gray-200'
																		: 'flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
																}
																type='text'
																placeholder='DNI'
																id={`members.${index}.nid`}
																name={`members.${index}.nid`}
																required={!underageMembers.includes(index)}
																disabled={underageMembers.includes(index)}
															/>
															{errors[`nid-${index}`] && (
																<span className='text-red-500'>
																	{errors[`nid-${index}`]}
																</span>
															)}
														</fieldset>
														<fieldset className='flex flex-col w-full md:w-5/12'>
															<label
																htmlFor={`members.${index}.nid`}
																className='text-black'
															>
																Genero
															</label>
															<select
																className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
																id={`members.${index}.gender`}
																name={`members.${index}.gender`}
																required={true}
															>
																<option value='Nada'>Seleccione género</option>
																<option
																	selected={
																		values.members[index].gender === 'Man'
																	}
																	value='Man'
																>
																	Hombre
																</option>
																<option
																	selected={
																		values.members[index].gender === 'Woman'
																	}
																	value='Woman'
																>
																	Mujer
																</option>
															</select>
															{errors[`gender-${index}`] && (
																<span className='text-red-500'>
																	{errors[`gender-${index}`]}
																</span>
															)}
														</fieldset>
														<fieldset className='flex flex-col w-full md:w-5/12'>
															<label
																htmlFor={`members.${index}.date_birth`}
																className='text-black'
															>
																Fecha de nacimiento
															</label>
															<Field
																className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
																type='date'
																placeholder='Hermandad o Asociación'
																id={`members.${index}.date_birth`}
																name={`members.${index}.date_birth`}
																onChange={e => {
																	const today = new Date()
																	const birthDate = new Date(e.target.value)
																	const age =
																		today.getFullYear() -
																		birthDate.getFullYear()
																	if (
																		age < 18 &&
																		!underageMembers.includes(index)
																	) {
																		setUnderageMembers([
																			...underageMembers,
																			index
																		])
																		// Block the rest of the fields
																		setFieldValue(`members.${index}.name`, '')
																		setFieldValue(
																			`members.${index}.surname`,
																			''
																		)
																		setFieldValue(`members.${index}.nid`, '')
																		setFieldValue(
																			`members.${index}.family_head`,
																			false
																		)
																		setFieldValue(
																			`members.${index}.homeless`,
																			false
																		)

																		// Disable the fields
																		document.getElementById(
																			`members.${index}.name`
																		).disabled = true
																		document.getElementById(
																			`members.${index}.surname`
																		).disabled = true
																		document.getElementById(
																			`members.${index}.gender`
																		).disabled = true
																		document.getElementById(
																			`members.${index}.nid`
																		).disabled = true
																		document.getElementById(
																			`members.${index}.family_head`
																		).disabled = true
																	} else if (
																		age >= 18 &&
																		underageMembers.includes(index)
																	) {
																		setUnderageMembers(
																			underageMembers.filter(i => i !== index)
																		)

																		// Enable the fields
																		document.getElementById(
																			`members.${index}.name`
																		).disabled = false
																		document.getElementById(
																			`members.${index}.surname`
																		).disabled = false
																		document.getElementById(
																			`members.${index}.nid`
																		).disabled = false
																		document.getElementById(
																			`members.${index}.family_head`
																		).disabled = false
																	}
																	if (age >= 18) {
																		values.members[index].type = 'Adult'
																	} else {
																		values.members[index].type = 'Child'
																	}
																	setFieldValue(
																		`members.${index}.date_birth`,
																		e.target.value
																	)
																}}
																required={true}
															/>
															{errors[`date_birth-${index}`] && (
																<span className='text-red-500'>
																	{errors[`date_birth-${index}`]}
																</span>
															)}
														</fieldset>
														<fieldset className='flex flex-col w-full'>
															<label
																htmlFor={`members.${index}.date_birth`}
																className='text-black ml-4'
															>
																Alérgenos
															</label>
															<CreatableSelect
																isMulti
																className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 mx-4'
																styles={{
																	control: provided => ({
																		...provided,
																		border: 'none',
																		borderRadius: '9999px',
																		boxShadow: 'none',
																		width: '100%'
																	}),
																	menu: provided => ({
																		...provided,
																		borderRadius: '0px'
																	})
																}}
																defaultValue={member.food_intolerances.map(
																	o => ({
																		label: o.toString(),
																		value: o.toString()
																	})
																)}
																classNamePrefix='Selecciona los alérgenos'
																placeholder='Selecciona los alérgenos'
																isDisabled={false}
																isClearable={false}
																options={intolerances}
																onChange={opts =>
																	setFieldValue(
																		`members.${index}.food_intolerances`,
																		opts.map(o => o.label)
																	)
																}
															/>
														</fieldset>
														<fieldset className='flex flex-row w-full md:w-5/12 gap-1'>
															<Field
																className={
																	underageMembers.includes(index)
																		? 'flex items-center border-2 rounded-xl border-gray-200 bg-gray-200'
																		: 'flex items-center border-2 rounded-xl border-gray-200 bg-white'
																}
																type='checkbox'
																id={`members.${index}.family_head`}
																name={`members.${index}.family_head`}
																disabled={underageMembers.includes(index)}
															/>
															<label
																htmlFor={`members.${index}.family_head`}
																className='text-black '
															>
																¿Es cabeza de familia?
															</label>
														</fieldset>
														<fieldset className='flex flex-row w-full md:w-5/12 gap-1'>
															<Field
																className={
																	underageMembers.includes(index)
																		? 'flex items-center border-2 rounded-xl border-gray-200 bg-gray-200'
																		: 'flex items-center border-2 rounded-xl border-gray-200 bg-white'
																}
																type='checkbox'
																id={`members.${index}.functional_diversity`}
																name={`members.${index}.functional_diversity`}
															/>
															<label
																htmlFor={`members.${index}.functional_diversity`}
																className='text-black'
															>
																¿Tiene alguna discapacidad?
															</label>
														</fieldset>
														<fieldset className='relative flex flex-row w-full md:w-5/12 mr-[300px] gap-1'>
															<Field
																className={
																	underageMembers.includes(index)
																		? 'flex items-center border-2 rounded-xl border-gray-200 bg-gray-200'
																		: 'flex items-center border-2 rounded-xl border-gray-200 bg-white'
																}
																type='checkbox'
																id={`members.${index}.homeless`}
																name={`members.${index}.homeless`}
															/>
															<label
																htmlFor={`members.${index}.homeless`}
																className='text-black'
															>
																¿Es indigente?
															</label>
														</fieldset>
														<hr className='w-4/5 border-gray-500 mt-4 mb-2'></hr>
													</div>
												))}
												<div className='flex justify-center items-center content-center'>
													<button
														type='button'
														className='bg-green-500 hover:bg-green-700 hover:cursor-pointer md:w-6 md:h-6 md:rounded-full text-white text-sm p-2 shadow-lg flex content-center items-center justify-center pb-2.5'
														onClick={() => {
															push({
																date_birth: '',
																type: 'Adult',
																name: '',
																surname: '',
																nationality: '',
																nid: '',
																family_head: false,
																gender: 'Man',
																functional_diversity: false,
																food_intolerances: [],
																homeless: false
															})
														}}
													>
														+
													</button>
												</div>
											</div>
										)}
									</FieldArray>

									<div className='flex justify-center w-full'>
										<Field
											type='submit'
											value='Dar de Alta'
											className={
												'bg-green-500 hover:bg-green-700 hover:cursor-pointer w-3/4 md:w-2/4 rounded-xl text-white text-sm p-2 shadow-lg'
											}
										/>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</div>
	)
}
