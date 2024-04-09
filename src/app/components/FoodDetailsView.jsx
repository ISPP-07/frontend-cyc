/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function FoodDetailsView({ food, almacen }) {
	return (
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
				<p className="font-Varela text-blue-500 font-bold mr-2">Cantidad:</p>
				<p className="p-1 font-Varela"> {food.quantity} </p>
			</article>
			<article className="flex items-center w-full">
				<p className="font-Varela text-blue-500 font-bold mr-2">Almacén:</p>
				<p className="p-1 font-Varela"> {almacen && almacen.name} </p>
			</article>
		</section>
	)
}
