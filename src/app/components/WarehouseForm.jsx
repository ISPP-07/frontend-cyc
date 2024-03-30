'use client'
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default function WarehouseForm({ onClickFunction, warehouseToUpdate }) {
	const [formData, setFormData] = useState({
		name: '',
		products: []
	})

	useEffect(() => {
		if (warehouseToUpdate) {
			setFormData(warehouseToUpdate)
		}
	}, [warehouseToUpdate])

	const handleNewWarehouseNameChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleAction = () => {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		if (!formData.name.trim()) {
			alert('El nombre del almacén no puede estar vacío')
			return
		}
		if (warehouseToUpdate) {
			axios
				.put(
					`${BASEURL}/cyc/warehouse/${warehouseToUpdate.id}`,
					JSON.stringify(formData),
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				.then(() => {
					window.location.reload()
				})
				.catch(error => {
					console.error('Error al actualizar el almacén:', error)
					alert(
						'Se produjo un error al actualizar el almacén. Por favor, inténtalo de nuevo.'
					)
				})
		} else {
			const finalFormData = { ...formData }
			axios
				.post(`${BASEURL}/cyc/warehouse`, JSON.stringify(finalFormData), {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(() => {
					window.location.reload()
				})
				.catch(error => {
					console.error('Error al crear el nuevo almacén:', error)
					if (error.response && error.response.status === 400) {
						alert(
							'Ya existe un almacén con ese nombre. Por favor, elige otro nombre.'
						)
					} else {
						alert(
							'Se produjo un error al crear el nuevo almacén. Por favor, inténtalo de nuevo.'
						)
					}
				})
		}
	}

	return (
		<div className="fixed bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50">
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
						onClick={onClickFunction}
						data-testid="close-button"
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
							onClick={handleAction}
							data-testid="create-update-button"
						>
							{warehouseToUpdate ? 'Confirmar' : 'Crear almacén'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
