'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */

function AddElementForm({ onClickFunction }) {
	return (
		<div className="flex flex-col bg-gray-50 rounded p-10 drop-shadow-lg">
			<h1 className="mb-10 text-center font-poppins text-2xl">
				<strong>Añadir Elemento</strong>
			</h1>
			<div>
				<article className="flex flex-col">
					<label htmlFor="nombre">Nombre:</label>
					<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Arroz Hacendado"
							className="p-1 w-full"
						/>
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="cantidad-total">Cantidad Total:</label>
					<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
						<input
							type="text"
							id="cantidad-total"
							name="cantidad-total"
							placeholder="3"
							className="p-1 w-full"
						/>
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="cantidad-almacen-1">Cantidad en Almacén 1:</label>
					<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
						<input
							type="text"
							id="cantidad-almacen-1"
							name="cantidad-almacen-1"
							placeholder="1"
							className="p-1 w-full"
						/>
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="cantidad-almacen-2">Cantidad en Almacén 2:</label>
					<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
						<input
							type="text"
							id="cantidad-almacen-2"
							name="cantidad-almacen-2"
							placeholder="2"
							className="p-1 w-full"
						/>
					</div>
				</article>
				<div className="flex items-center justify-between gap-5 mt-5">
					<div
						className="bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 m-auto text-center"
						onClick={onClickFunction}
					>
						Añadir Elemento
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddElementForm
