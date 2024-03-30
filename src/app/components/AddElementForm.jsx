'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

function AddElementForm({ onClickFunction }) {
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
				<form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2">
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="nombre">Nombre:</label>

						<input
							data-testid="nombre"
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Arroz Hacendado"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-total">Cantidad Total:</label>

						<input
							data-testid="cantidad-total"
							type="text"
							id="cantidad-total"
							name="cantidad-total"
							placeholder="3"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-almacen-1">Cantidad en Almacén 1:</label>

						<input
							data-testid="cantidad-almacen-1"
							type="text"
							id="cantidad-almacen-1"
							name="cantidad-almacen-1"
							placeholder="1"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<article className="flex flex-col w-full md:w-5/12">
						<label htmlFor="cantidad-almacen-2">Cantidad en Almacén 2:</label>

						<input
							data-testid="cantidad-almacen-2"
							type="text"
							id="cantidad-almacen-2"
							name="cantidad-almacen-2"
							placeholder="2"
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white p-1 pl-2 w-full"
						/>
					</article>
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center"
							onClick={onClickFunction}
						>
							Añadir Elemento
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddElementForm
