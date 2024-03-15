'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

function DeliveriesForm({ onClickFunction }) {
	return (
		<div className="fixed bg-gray-600 bg-opacity-50 h-full w-full flex font-Varela items-center justify-center z-50">
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white">
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
							id="familia"
							name="familia"
							placeholder="Bernal Herrera"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-total">Fecha:</label>

						<input
							type="date"
							id="fecha"
							name="fecha"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-almacen-1">Nombre del producto:</label>

						<input
							type="text"
							id="producto"
							name="producto"
							placeholder="arroz"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-almacen-2">Cantidad:</label>

						<input
							type="text"
							id="cantidad"
							name="cantidad"
							placeholder="2"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center"
							onClick={onClickFunction}
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
