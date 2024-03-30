'use client'
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { fetchFamilies } from '../families/fetchFamilies'
import Select from 'react-select'
import { fetchDataFoods } from '../food/fetchDataFoods'

function DeliveriesForm({ onClickFunction }) {
	const [families, setFamilies] = useState([])
	const [products, setProducts] = useState([])

	const [formData, setFormData] = useState({
		date: '',
		months: '',
		state: '',
		lines: [{ product_id: '', quantity: '', state: '' }],
		family_id: ''
	})

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleProductInputChange = (e, index, field) => {
		const updatedProducts = [...formData.lines]
		if (e === null) {
			console.log('No se ha seleccionado el producto Nº' + index + 1)
		} else if (field === 'product_id') {
			updatedProducts[index][field] = e.value
		} else if (field === 'quantity') {
			updatedProducts[index][field] = e.target.value
		} else if (field === 'state') {
			updatedProducts[index][field] = e.target.value
		}
		setFormData(prevState => ({
			...prevState,
			lines: updatedProducts
		}))
	}

	const handleAddProduct = () => {
		setFormData(prevState => ({
			...prevState,
			lines: [...prevState.lines, { product_id: '', quantity: '', state: '' }]
		}))
	}

	const handleRemoveProduct = index => {
		const updatedProducts = [...formData.lines]
		updatedProducts.splice(index, 1)
		setFormData({ ...formData, lines: updatedProducts })
	}

	const handleAddDelivery = () => {
		const finalFormData = {
			...formData
		}
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		axios.post(`${BASEURL}/cyc/delivery`, JSON.stringify(finalFormData), {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFamilies()
				setFamilies(
					data.map(family => ({
						value: family.id,
						label: family.name
					}))
				)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchDataFoods()
				setProducts(
					data.map(product => ({
						value: product.id,
						label: product.name,
						quantity: product.quantity
					}))
				)
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
		<div className="fixed bg-gray-600 bg-opacity-50 h-full w-full flex font-Varela items-center justify-center z-50">
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white max-h-full overflow-y-auto">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
						onClick={onClickFunction}
					>
						X
					</button>
				</div>
				<form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2">
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="nombre">Familia:</label>

						<div
							className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white"
							data-testid="familySelect"
						>
							<Select
								className="border-0 w-full"
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
								classNamePrefix="Selecciona una familia"
								defaultValue={{ label: 'Selecciona una familia', value: 0 }}
								isDisabled={false}
								isLoading={false}
								isClearable={true}
								isRtl={false}
								isSearchable={true}
								name="family_id"
								options={families}
								onChange={opt =>
									setFormData({
										...formData,
										family_id: opt?.value ? opt.value : null
									})
								}
							/>
						</div>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-total">Fecha:</label>

						<input
							type="date"
							id="date"
							name="date"
							value={formData.date}
							onChange={handleInputChange}
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							data-testid="datePicker"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-total">Cantidad de meses:</label>

						<input
							type="text"
							id="months"
							name="months"
							value={formData.months}
							onChange={handleInputChange}
							placeholder="0"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							data-testid="monthInput"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-total">Estado:</label>

						<div
							className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white"
							data-testid="stateSelect"
						>
							<Select
								className="border-0 w-full"
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
								classNamePrefix="Selecciona un estado"
								defaultValue={formData.state}
								isDisabled={false}
								isClearable={false}
								isSearchable={false}
								options={[
									{ label: 'Avisado', value: 'notified' },
									{ label: 'Entregado Todo', value: 'delivered' },
									{ label: 'Pendiente', value: 'next' }
								]}
								onChange={opt =>
									setFormData({
										...formData,
										state: opt ? opt.value : 'notified'
									})
								}
							/>
						</div>
					</article>
					{formData.lines.map((product, index) => (
						<React.Fragment key={index}>
							<div className="flex flex-wrap items-center gap-3">
								<article className="flex flex-col w-full md:w-4/12">
									<label htmlFor={`product-${index}`}>
										Nombre del producto {index + 1}:
									</label>
									<div
										className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white"
										data-testid="productSelect"
									>
										<Select
											className="border-0 w-full"
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
											classNamePrefix="Selecciona un producto"
											defaultValue={{
												label: 'Selecciona un producto',
												value: 0
											}}
											isDisabled={false}
											isLoading={false}
											isClearable={true}
											isRtl={false}
											isSearchable={true}
											name={`product-${index}`}
											options={products}
											onChange={e =>
												handleProductInputChange(e, index, 'product_id')
											}
										/>
									</div>
								</article>
								<article className="flex flex-col w-full md:w-2/12">
									<label htmlFor={`quantity-${index}`}>Cantidad:</label>
									<input
										type="text"
										id={`quantity-${index}`}
										name={`quantity-${index}`}
										value={product.quantity}
										onChange={e =>
											handleProductInputChange(e, index, 'quantity')
										}
										placeholder="0"
										className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
										data-testid="quantityInput"
									/>
								</article>
								<article className="flex flex-col w-full md:w-4/12">
									<label htmlFor="cantidad-total">Estado del producto:</label>
									<input
										type="text"
										id="stateProduct"
										name="stateProduct"
										value={product.state}
										onChange={e => handleProductInputChange(e, index, 'state')}
										placeholder="Nuevo"
										className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
										data-testid="productStateInput"
									/>
								</article>
								<div className="flex items-center justify-center">
									{index > 0 && (
										<button
											className="bg-red-500 hover:bg-red-700 rounded-md text-white font-bold py-1 px-2 mt-0 md:mt-0"
											onClick={() => handleRemoveProduct(index)}
											type="button"
											data-testid="remove-product"
										>
											-
										</button>
									)}
								</div>
							</div>
						</React.Fragment>
					))}
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold py-1 px-2"
							onClick={handleAddProduct}
							type="button"
							data-testid="add-product"
						>
							+
						</button>
					</div>
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center"
							onClick={handleAddDelivery}
							data-testid="create-update-button"
						>
							Añadir Entrega
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DeliveriesForm
