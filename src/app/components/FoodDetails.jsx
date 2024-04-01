'use client'
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import { fetchWarehouse } from '../food/warehouse/fetchWarehouse.js'

export default function FoodDetails({ food }) {
	const [almacen, setAlmacen] = useState(null)

	useEffect(() => {
		fetchWarehouse(food.warehouse_id)
			.then(data => {
				setAlmacen(data)
			})
			.catch(error => {
				console.error('Error al cargar los datos:', error)
			})
	}, [])

	return (
		<div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300 w-[45	0px]">
			<div className="flex gap-3 justify-end items-center w-full">
				<h1 className="text-center font-poppins text-2xl">
					<strong>Detalles del producto</strong>
				</h1>
			</div>
			<hr></hr>
			{food ? (
				<section className="flex flex-col gap-3 w-full">
					<article className="flex items-center w-full">
						<p className="font-Varela w-fit text-blue-500 font-bold mr-2">
							Nombre:
						</p>
						<p className="p-1 w-full font-Varela"> {food.name} </p>
					</article>
					<article className="flex items-center w-full">
						<p className="font-Varela text-blue-500 font-bold mr-2">
							Fecha de caducidad:
						</p>
						<p className="p-1"> {food.exp_date} </p>
					</article>
					<article className="flex items-center w-full">
						<p className="font-Varela text-blue-500 font-bold mr-2">
							Cantidad:
						</p>
						<p className="p-1 font-Varela"> {food.quantity} </p>
					</article>
					<article className="flex items-center w-full">
						<p className="font-Varela text-blue-500 font-bold mr-2">Almacén:</p>
						<p className="p-1 font-Varela"> {almacen && almacen.name} </p>
					</article>
				</section>
			) : (
				<p>Cargando...</p>
			)}
		</div>
	)
}
