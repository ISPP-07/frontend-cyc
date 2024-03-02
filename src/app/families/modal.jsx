'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link'

function Modal() {
	const closedModal = () => {
		addEventListener('click', () => {
			window.location.href = '/families'
		})
	}
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
			<div className="p-8 border w-[32rem] h-fit shadow-lg rounded-md bg-white">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-1/12 h-full mb-3"
						onClick={closedModal()}
					>
						X
					</button>
				</div>
				<div>
					<div className="mt-2 px-10 py-3">
						<form>
							<fieldset className="flex flex-col">
								<label className="text-gray-700 font-bold">Nombre</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Apellido</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Dirección</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">
									Nº de Personas
								</label>
								<input
									className="border-2 border-gray-300 rounded-md h-8 p-2"
									type="text"
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Nacionalidad</label>
								<input
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
								/>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">
									Intervalos de Edad
								</label>
								<div className="flex justify-around items-center">
									<input
										className="border-2 border-gray-300 rounded-md h-4"
										type="checkbox"
									/>
									<label>0-3</label>

									<input
										className="border-2 border-gray-300 rounded-md h-4"
										type="checkbox"
									/>
									<label>4-16</label>
									<input
										className="border-2 border-gray-300 rounded-md h-4"
										type="checkbox"
									/>
									<label>17-30</label>
									<input
										className="border-2 border-gray-300 rounded-md h-4"
										type="checkbox"
									/>
									<label>31-64</label>
									<input
										className="border-2 border-gray-300 rounded-md h-8"
										type="checkbox"
									/>
									<label>65+</label>
								</div>
							</fieldset>
						</form>
					</div>
					<div className="flex justify-center mt-4">
						<Link
							href="/families"
							className="px-4 py-2 w-72 shadow-lg text-center bg-[#75AF73] text-white text-base font-medium rounded-md hover:bg-[#557e53] focus:outline-none focus:ring-2 focus:ring-gray-300"
						>
							Dar de Alta
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
