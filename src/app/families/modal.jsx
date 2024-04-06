'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Formik, FieldArray, Field, Form } from 'formik'

export default function Modal({
	closeModal = () => {
		window.location.href = '/families'
	}
}) {
	const [underageMembers, setUnderageMembers] = useState([])
	const [errors, setErrors] = useState({})

	const router = useRouter()

	function getDateInFuture() {
		const currentDate = new Date()
		const futureDate = new Date(currentDate)
		futureDate.setMonth(currentDate.getMonth() + 6)

		const year = futureDate.getFullYear()
		const month = String(futureDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
		const day = String(futureDate.getDate()).padStart(2, '0')

		return `${year}-${month}-${day}`
	}

	const futureDate = getDateInFuture()
	const initialValues = {
		name: '',
		phone: '',
		address: '',
		referred_organization: '',
		next_renewal_date: futureDate,
		derecognition_state: 'Active',
		observation: '',
		number_of_people: 0,
		informed: false,
		members: [
			{
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
			}
		]
	}

	return (
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
					initialValues={initialValues}
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

							const dniRegExp = /^\d{8}[A-Z]$/
							const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
							const passportRegExp = /^[A-Z]{2}\d{7}$/
							values.members.forEach((member, index) => {
								// This is a XOR operation, if one of the three conditions is true, the result is true
								if (
									!dniRegExp.test(member.nid) &&
									!nieRegExp.test(member.nid) &&
									!passportRegExp.test(member.nid) &&
									!underageMembers.includes(index)
								) {
									isValid = false
									errors[`nid-${index}`] = 'El DNI/NIE/Pasaporte no es válido'
								} else if (dniRegExp.test(member.nid)) {
									// Validate the letter of the DNI
									const dni = member.nid
									const letter = dni.charAt(dni.length - 1)
									const number = dni.slice(0, -1)
									const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
									const letterCorrect = letters.charAt(number % 23)
									if (letter !== letterCorrect) {
										isValid = false
										errors.nid = 'La letra del DNI no es correcta'
									}
								}

								const birthDate = new Date(member.date_birth)
								const today = new Date()

								if (today < birthDate) {
									isValid = false
									errors[`date_birth-${index}`] =
										'La fecha de nacimiento no puede ser futura'
								}
							})

							if (!isValid) {
								setErrors(errors)
								return
							}

							// Post
							const response = await axios
								.post(
									process.env.NEXT_PUBLIC_BASE_URL + '/cyc/family',
									values,
									{
										headers: {
											'Content-Type': 'application/json'
										}
									}
								)
								.then(function (response) {
									// Navigate to the newly created family
									router.push('/families/' + response.data.id.toString())
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
													onClick={remove}
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
														className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
														type='text'
														placeholder='Nombre'
														id={`members.${index}.name`}
														name={`members.${index}.name`}
														required={!underageMembers.includes(index)}
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
														className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
														type='text'
														placeholder='Apellido'
														id={`members.${index}.surname`}
														name={`members.${index}.surname`}
														required={!underageMembers.includes(index)}
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
														required={!underageMembers.includes(index)}
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
														className='flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full'
														type='text'
														placeholder='DNI'
														id={`members.${index}.nid`}
														name={`members.${index}.nid`}
														required={!underageMembers.includes(index)}
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
														required={!underageMembers.includes(index)}
													>
														<option value='Nada'>Seleccione género</option>
														<option value='Man'>Hombre</option>
														<option value='Women'>Mujer</option>
													</select>
												</fieldset>
												<fieldset className='flex flex-col w-full md:w-5/12'>
													<label
														htmlFor={`members.${index}.date_birth`}
														className='text-black'
													>
														Fecha de nacimiento{' '}
														<span className='text-red-500'>*</span>
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
																today.getFullYear() - birthDate.getFullYear()
															if (
																age < 18 &&
																!underageMembers.includes(index)
															) {
																setUnderageMembers([...underageMembers, index])
															} else if (
																age >= 18 &&
																underageMembers.includes(index)
															) {
																setUnderageMembers(
																	underageMembers.filter(i => i !== index)
																)
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
												<fieldset className='flex flex-row w-full md:w-5/12 gap-1'>
													<Field
														className='flex items-center border-2 rounded-xl border-gray-200 bg-white'
														type='checkbox'
														id={`members.${index}.family_head`}
														name={`members.${index}.family_head`}
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
														className='flex items-center border-2 rounded-xl border-gray-200 bg-white'
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
														className='flex items-center border-2 rounded-xl border-gray-200 bg-white'
														type='checkbox'
														id={`members.${index}.homeless`}
														name={`members.${index}.homeless`}
													/>
													<label
														htmlFor={`members.${index}.homeless`}
														className='text-black'
													>
														¿Es sin-techo?
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
	)
}
