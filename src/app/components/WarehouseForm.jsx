'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'

function WarehouseForm({ onClickFunction }) {
	const [formData, setFormData] = useState({
		name: '',
		products: []
	})

	const handleNewWarehouseNameChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleCreateWarehouse = () => {
		const finalFormData = {
			...formData
		}
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		axios.post(`${BASEURL}/cyc/warehouse`, JSON.stringify(finalFormData), {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log('Datos del formulario:', finalFormData)
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
				<form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[260px] gap-3 mt-2">
					<article className="flex flex-col w-full">
						<label htmlFor="nombre">Nombre:</label>

						<input
							data-testid="nombre"
							type="text"
							id="nombre"
							name="name"
							value={formData.name}
							onChange={handleNewWarehouseNameChange}
							placeholder="Almacén X"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>

					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center"
							onClick={handleCreateWarehouse}
						>
							Crear almacén
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default WarehouseForm
