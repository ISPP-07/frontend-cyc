'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'

function DeliveriesForm({ onClickFunction }) {
	const [formData, setFormData] = useState({
		family: '',
		date: '',
		products: [{ name: '', quantity: '' }]
	})

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleProductInputChange = (e, index, field) => {
		const { value } = e.target
		setFormData(prevState => {
			const updatedProducts = [...prevState.products]
			updatedProducts[index][field] = value
			return { ...prevState, products: updatedProducts }
		})
	}

	const handleAddProduct = () => {
		setFormData(prevState => ({
			...prevState,
			products: [...prevState.products, { name: '', quantity: '' }]
		}))
	}

	const handleRemoveProduct = index => {
		const updatedProducts = [...formData.products]
		updatedProducts.splice(index, 1)
		setFormData({ ...formData, products: updatedProducts })
	}

	const handleAddDelivery = () => {
		const finalFormData = {
			...formData,
			state: formData.state || 'Entregado Todo'
		}
		axios.post(
			`https://65e22f03a8583365b317ff53.mockapi.io/food/deliveries`,
			JSON.stringify(finalFormData),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		console.log('Datos del formulario:', finalFormData)
	}

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

						<input
							type="text"
							id="family"
							name="family"
							value={formData.family}
							onChange={handleInputChange}
							placeholder="Bernal Herrera"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
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
						/>
					</article>
					{formData.products.map((product, index) => (
						<React.Fragment key={index}>
							<article className="flex flex-col w-full md:w-5/12">
								<label htmlFor={`product-${index}`}>
									Nombre del producto {index + 1}:
								</label>
								<input
									type="text"
									id={`product-${index}`}
									name={`product-${index}`}
									value={product.name}
									onChange={e => handleProductInputChange(e, index, 'name')}
									placeholder="arroz"
									className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
								/>
							</article>
							<article className="flex flex-col w-full md:w-5/12">
								<label htmlFor={`quantity-${index}`}>Cantidad:</label>
								<input
									type="text"
									id={`quantity-${index}`}
									name={`quantity-${index}`}
									value={product.quantity}
									onChange={e => handleProductInputChange(e, index, 'quantity')}
									placeholder="2"
									className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
								/>
							</article>
							<div className="flex items-center justify-center">
								{index > 0 && (
									<button
										className="bg-red-500 hover:bg-red-700 rounded-md text-white font-bold py-1 px-2 mt-0 md:mt-0"
										onClick={() => handleRemoveProduct(index)}
										type="button"
									>
										-
									</button>
								)}
							</div>
						</React.Fragment>
					))}
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold py-1 px-2"
							onClick={handleAddProduct}
							type="button"
						>
							+
						</button>
					</div>
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center"
							onClick={handleAddDelivery}
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
