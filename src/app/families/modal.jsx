'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import ButtonText from '../components/buttonText'

function Modal({
	closeModal = () => {
		window.location.href = '/families'
	}
}) {
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
				<form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2">
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
						<label htmlFor="telephone" className="text-black">
							Teléfono
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Teléfono"
							id="telephone"
							name="telephone"
						/>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="direction" className="text-black">
							Dirección
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Dirección"
							id="direction"
							name="direction"
						/>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="numberPeople" className="text-black">
							Nº de Personas
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Nº de Personas"
							id="numberPeople"
							name="numberPeople"
						/>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="nationality" className="text-black">
							Nacionalidad
						</label>
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
							type="text"
							placeholder="Nacionalidad"
							id="nationality"
							name="nationality"
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
					<fieldset className="flex flex-col w-10/12">
						<label className="text-black">Intervalos de Edad</label>
						<div className="flex flex-wrap flex-row justify-start md:justify-around items-center my-3">
							<div className="flex gap-2 justify-start items-center w-5/12 md:justify-center md:w-fit">
								<input
									className="border-2 border-gray-300 rounded-md h-4"
									type="checkbox"
									id="03"
									name="intervals"
								/>
								<label htmlFor="03">0-3</label>
							</div>

							<div className="flex gap-2 justify-start items-center w-5/12 md:justify-center md:w-fit">
								<input
									className="border-2 border-gray-300 rounded-md h-4"
									type="checkbox"
									id="416"
									name="intervals"
								/>
								<label htmlFor="416">4-16</label>
							</div>

							<div className="flex gap-2 justify-start items-center w-5/12 md:justify-center md:w-fit">
								<input
									className="border-2 border-gray-300 rounded-md h-4"
									type="checkbox"
									id="1730"
									name="intervals"
								/>
								<label htmlFor="1730">17-30</label>
							</div>

							<div className="flex gap-2 justify-start items-center w-5/12 md:justify-center md:w-fit">
								<input
									className="border-2 border-gray-300 rounded-md h-4"
									type="checkbox"
									id="3164"
									name="intervals"
								/>
								<label htmlFor="3164">31-64</label>
							</div>
							<div className="flex gap-2 justify-start items-center w-5/12 md:justify-center md:w-fit">
								<input
									className="border-2 border-gray-300 rounded-md h-4"
									type="checkbox"
									id="65"
									name="intervals"
								/>
								<label htmlFor="65">65+</label>
							</div>
						</div>
					</fieldset>
					<div className="flex justify-center w-full">
						<ButtonText
							text={'Dar de Alta'}
							color={'bg-green-500'}
							moreStyles={
								'hover:bg-green-700 hover:cursor-pointer w-3/4 md:w-2/4'
							}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Modal
