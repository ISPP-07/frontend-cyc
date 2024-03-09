'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'

function Modal() {
	const closedModal = () => {
		window.location.href = '/families'
	}

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
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
			<div className="p-8 border w-[32rem] h-fit shadow-lg rounded-md bg-white">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-1/12 h-full mb-3"
						onClick={closedModal}
					>
						X
					</button>
				</div>
				<div>
					<form onSubmit={onSubmit}>
						<div className="mt-2 px-10 py-3">
							<fieldset className="flex flex-col">
								<label className="text-gray-700 font-bold">Nombre</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									name="name"
									id="name"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Teléfono</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									name="phone"
									id="phone"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Dirección</label>
								<input
									name="address"
									id="address"
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">
									Nº de Personas
								</label>
								<input
									name="number_of_people"
									id="number_of_people"
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">
									Hermandad o Asociación
								</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
									name="referred_organization"
									id="referred_organization"
								/>
							</fieldset>
						</div>
						<div className="flex justify-center mt-4">
							<input
								type="submit"
								value="Dar de Alta"
								className="px-4 py-2 w-72 shadow-lg text-center bg-[#75AF73] text-white text-base font-medium rounded-md hover:bg-[#557e53] focus:outline-none focus:ring-2 focus:ring-gray-300"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Modal
