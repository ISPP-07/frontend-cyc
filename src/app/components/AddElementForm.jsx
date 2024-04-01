'use client'
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import { Formik, FieldArray, Field, Form } from 'formik'
import axios from 'axios'
import { fetchDataWarehouse } from '../food/warehouse/fetchDataWarehouse'

export default function AddElementForm({ onClickFunction }) {
	const [almacenes, setAlmacenes] = useState(null)
	useEffect(() => {
		fetchDataWarehouse()
			.then(data => {
				setAlmacenes(data)
			})
			.catch(error => {
				console.error('Error al cargar los datos:', error)
			})
	}, [])

	const initialValues = {
		products: [
			{
				name: '',
				exp_date: '',
				quantity: '',
				warehouse_id: ''
			}
		]
	}

	return (
		<div className="fixed bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50">
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
						onClick={onClickFunction}
					>
						X
					</button>
				</div>
				<Formik
					initialValues={initialValues}
					onSubmit={async (values, actions) => {
						try {
							const response = await axios
								.post(
									process.env.NEXT_PUBLIC_BASE_URL + '/cyc/warehouse/product',
									values,
									{
										headers: {
											'Content-Type': 'application/json'
										}
									}
								)
								.then(function (response) {
									window.location.reload()
								})
								.catch(function (error) {
									alert(
										`Ha habido un error al crear el producto: ${error.response.data.detail}`
									)
								})
							console.log(response.data)
							actions.setSubmitting(false)
						} catch (error) {
							console.error('Error:', error)
							actions.setSubmitting(false)
						}
					}}
				>
					{({ values, setFieldValue }) => (
						<Form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2">
							<FieldArray name="products">
								{({ push, remove }) => (
									<div>
										{values.products.map((product, index) => (
											<div
												key={index}
												className="flex ml-8 flex-col md:flex-row md:flex-wrap justify-center gap-x-16 content-center mt-2"
											>
												<p className="flex w-96 justify-center ml-12">
													Producto {index + 1}
												</p>
												<button
													onClick={remove}
													className="bg-red-500 text-white text-sm rounded-full shadow-lg w-[20px] h-[20px] mb-3"
												>
													X
												</button>
												<fieldset className="flex flex-col w-full md:w-5/12">
													<label
														htmlFor={`products.${index}.name`}
														className="text-black"
													>
														Nombre
													</label>
													<Field
														className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
														type="text"
														placeholder="Nombre"
														id={`products.${index}.name`}
														name={`products.${index}.name`}
													/>
												</fieldset>
												<fieldset className="flex flex-col w-full md:w-5/12">
													<label
														htmlFor={`products.${index}.exp_date`}
														className="text-black"
													>
														Fecha de caducidad
													</label>
													<Field
														className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
														type="date"
														id={`products.${index}.exp_date`}
														name={`products.${index}.exp_date`}
													/>
												</fieldset>
												<fieldset className="flex flex-col w-full md:w-5/12">
													<label
														htmlFor={`products.${index}.quantity`}
														className="text-black"
													>
														Cantidad
													</label>
													<Field
														className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
														type="number"
														placeholder="Cantidad (kg)"
														id={`products.${index}.quantity`}
														name={`products.${index}.quantity`}
													/>
												</fieldset>
												<fieldset className="flex flex-col w-full md:w-5/12">
													<label
														htmlFor={`products.${index}.warehouse_id`}
														className="text-black"
													>
														Almacén
													</label>
													<select
														className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
														id={`products.${index}.warehouse_id`}
														name={`products.${index}.warehouse_id`}
														onChange={e => {
															const newProducts = [...values.products]
															newProducts[index].warehouse_id = e.target.value
															setFieldValue(
																`products.${index}.warehouse_id`,
																e.target.value
															)
														}}
													>
														<option value="">Selecciona un almacén</option>
														{almacenes &&
															almacenes.map(almacen => (
																<option key={almacen.id} value={almacen.id}>
																	{almacen.name}
																</option>
															))}
													</select>
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
														name: '',
														exp_date: '',
														quantity: '',
														warehouse_id: ''
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
									value="Añadir producto"
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
