'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Modal({
	closeModal = () => {
		window.location.href = '/families'
	}
}) {
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

	async function onSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.target)
		// WARNING this might be deleted in future development
		formData.append('derecognition_state', 'Active')
		formData.append('next_renewal_date', futureDate)
		// up until here
		const object = {}
		formData.forEach((value, key) => (object[key] = value))
		const json = JSON.stringify(object)
		console.log(json)
		axios
			.post(process.env.NEXT_PUBLIC_BASE_URL + '/cyc/family', json, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(function (response) {
				// Navigate to the newly created family
				router.push('/families/' + response.data.id.toString())
			})
			.catch(function (error) {
				alert(
					`Ha habido un error al crear la nueva familia: ${error.response.data.detail}`
				)
			})
	}

	return (
		<div className="fixed bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50">
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
						onClick={closeModal}
					>
						X
					</button>
				</div>
				<form
					onSubmit={onSubmit}
					className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2"
				>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="name" className="text-black">
							Nombre
						</label>
						<input
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
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Teléfono"
							id="phone"
							name="phone"
						/>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="address" className="text-black">
							Dirección
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Dirección"
							id="address"
							name="address"
						/>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="number_of_people" className="text-black">
							Nº de Personas
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Nº de Personas"
							id="number_of_people"
							name="number_of_people"
						/>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="association" className="text-black">
							Hermandad o Asociación
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Hermandad o Asociación"
							id="association"
							name="association"
						/>
					</fieldset>
					<div className="flex justify-center w-full">
						<input
							type="submit"
							value="Dar de Alta"
							className={
								'bg-green-500 hover:bg-green-700 hover:cursor-pointer w-3/4 md:w-2/4 rounded-xl text-white text-sm p-2 shadow-lg'
							}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}
