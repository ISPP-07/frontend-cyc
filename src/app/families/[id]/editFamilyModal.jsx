/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Formik, FieldArray, Field, Form } from 'formik'
import { fetchFamily } from './fetchFamily'
export default function Modal({
	closeModal = () => {
		window.location.href = '/families'
	},
	id
}) {
	const router = useRouter()
	const [family, setFamily] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFamily(id)
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

	return (
		<div>
			{family && (
				<div className="fixed bg-gray-600 bg-opacity-50 top-0 left-0 h-full w-full flex items-center justify-center z-50 ">
					<div className="p-10 border shadow-lg rounded-xl bg-white overflow-y-auto max-h-[600px]">
						<div className="flex justify-end">
							<button
								className="bg-red-500 text-white text-xl rounded-full shadow-lg w-[30px] h-[30px] mb-3"
								onClick={closeModal}
							>
								X
							</button>
						</div>
						<p className="flex justify-center text-black">
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
									family_head: member.family_head,
									functional_diversity: member.functional_diversity,
									homeless: member.homeless
								}))
							}}
							onSubmit={async (values, actions) => {
								try {
									const response = await axios
										.patch(
											process.env.NEXT_PUBLIC_BASE_URL +
												`/cyc/family/${family.id}`,
											values,
											{
												headers: {
													'Content-Type': 'application/json'
												}
											}
										)
										.then(function (response) {
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
							{({ values }) => (
								<Form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2">
									<fieldset className="flex flex-col w-full md:w-5/12">
										<label htmlFor="name" className="text-black">
											Nombre
										</label>
										<Field
											className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
											type="text"
											placeholder="Nombre"
											id="name"
											name="name"
										/>
									</fieldset>
									<fieldset className="flex flex-col w-full md:w-5/12">
										<label htmlFor="phone" className="text-black">
											Teléfono
										</label>
										<Field
											className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
											type="text"
											placeholder="Teléfono"
											pattern="[0-9]{9}"
											id="phone"
											name="phone"
											value={family.phone}
										/>
									</fieldset>
									<fieldset className="flex flex-col w-full md:w-5/12">
										<label htmlFor="address" className="text-black">
											Dirección
										</label>
										<Field
											className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
											type="text"
											placeholder="Dirección"
											id="address"
											name="address"
											value={family.address}
										/>
									</fieldset>
									<fieldset className="flex flex-col w-full md:w-5/12">
										<label htmlFor="association" className="text-black">
											Hermandad o Asociación
										</label>
										<Field
											className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
											type="text"
											placeholder="Hermandad o Asociación"
											id="referred_organization"
											name="referred_organization"
											value={family.referred_organization}
										/>
									</fieldset>
									<fieldset className="flex flex-col w-full md:w-5/12">
										<label htmlFor="observations" className="text-black">
											Observaciones
										</label>
										<Field
											className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2"
											type="textarea"
											placeholder="Observaciones"
											id="observation"
											name="observation"
											value={family.observation}
										/>
									</fieldset>

									<hr className="w-4/5 border-gray-500 mt-3 mb-3"></hr>
									<p>Miembros de la familia</p>
									<FieldArray name="members">
										{({ push, remove }) => (
											<div>
												{values.members.map((member, index) => (
													<div
														key={index}
														className="flex ml-8 flex-col md:flex-row md:flex-wrap justify-center gap-x-16 content-center mt-2"
													>
														<p className="flex w-96 justify-center ml-12">
															Miembro {index + 1}
														</p>
														<button
															onClick={remove}
															className="bg-red-500 text-white text-sm rounded-full shadow-lg w-[20px] h-[20px] mb-3"
														>
															X
														</button>
														<fieldset className="flex flex-col w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.name`}
																className="text-black"
															>
																Nombre
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
																type="text"
																placeholder="Nombre"
																id={`members.${index}.name`}
																name={`members.${index}.name`}
															/>
														</fieldset>
														<fieldset className="flex flex-col w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.surname`}
																className="text-black"
															>
																Apellido
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
																type="text"
																placeholder="Apellido"
																id={`members.${index}.surname`}
																name={`members.${index}.surname`}
															/>
														</fieldset>
														<fieldset className="flex flex-col w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.nationality`}
																className="text-black"
															>
																Nacionalidad
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
																type="text"
																placeholder="Nacionalidad"
																id={`members.${index}.nationality`}
																name={`members.${index}.nationality`}
															/>
														</fieldset>
														<fieldset className="flex flex-col w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.nid`}
																className="text-black"
															>
																DNI
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
																type="text"
																placeholder="DNI"
																id={`members.${index}.nid`}
																name={`members.${index}.nid`}
															/>
														</fieldset>
														<fieldset className="flex flex-col w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.nid`}
																className="text-black"
															>
																Genero
															</label>
															<select
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
																id={`members.${index}.gender`}
																name={`members.${index}.gender`}
															>
																<option value="Nada">Seleccione género</option>
																<option value="Man">Hombre</option>
																<option value="Women">Mujer</option>
															</select>
														</fieldset>
														<fieldset className="flex flex-col w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.date_birth`}
																className="text-black"
															>
																Fecha de nacimiento
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
																type="date"
																placeholder="Hermandad o Asociación"
																id={`members.${index}.date_birth`}
																name={`members.${index}.date_birth`}
															/>
														</fieldset>
														<fieldset className="flex flex-row w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.family_head`}
																className="text-black "
															>
																¿Es cabeza de familia?
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white ml-6"
																type="checkbox"
																id={`members.${index}.family_head`}
																name={`members.${index}.family_head`}
															/>
														</fieldset>
														<fieldset className="flex flex-row w-full md:w-5/12">
															<label
																htmlFor={`members.${index}.functional_diversity`}
																className="text-black"
															>
																¿Tiene alguna discapacidad?
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white ml-4 "
																type="checkbox"
																id={`members.${index}.functional_diversity`}
																name={`members.${index}.functional_diversity`}
															/>
														</fieldset>
														<fieldset className="relative flex flex-row w-full md:w-5/12 mr-[300px]">
															<label
																htmlFor={`members.${index}.homeless`}
																className="text-black"
															>
																¿Es indigente?
															</label>
															<Field
																className="flex items-center border-2 rounded-xl border-gray-200 bg-white ml-4"
																type="checkbox"
																id={`members.${index}.homeless`}
																name={`members.${index}.homeless`}
															/>
														</fieldset>
														<hr className="w-4/5 border-gray-500 mt-4 mb-2"></hr>
													</div>
												))}
												<div className="flex justify-center items-center content-center">
													<button
														type="button"
														className="bg-green-500 hover:bg-green-700 hover:cursor-pointer md:w-6 md:h-6 md:rounded-full text-white text-sm p-2 shadow-lg flex content-center items-center justify-center pb-2.5"
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

									<div className="flex justify-center w-full">
										<Field
											type="submit"
											value="Dar de Alta"
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
