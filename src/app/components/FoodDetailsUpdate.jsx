/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-disable no-unused-vars */

export default function FoodDetailsUpdate({ food, onSubmit, warehouse }) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
			<article className="flex items-center w-full">
				<label
					htmlFor="name"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Nombre:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="text"
						id="name"
						name="name"
						className="p-1 w-full rounded-xl bg-white placeholder-black"
						defaultValue={food.name}
						data-testid="name"
					/>
				</div>
			</article>
			<article className="flex items-center w-full">
				<label
					htmlFor="exp_date"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Fecha de caducidad:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="date"
						id="exp_date"
						name="exp_date"
						className="p-1 w-full rounded-xl bg-white placeholder-black"
						defaultValue={food.exp_date}
						data-testid="exp_date"
					/>
				</div>
			</article>
			<article className="flex items-center w-full">
				<label
					htmlFor="quantity"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Cantidad:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="number"
						id="quantity"
						name="quantity"
						className="p-1 w-full rounded-xl bg-white placeholder-black"
						defaultValue={food.quantity}
						data-testid="quantity"
					/>
				</div>
			</article>

			<div className="flex items-center w-full justify-center gap-5 mt-5">
				<input
					type="submit"
					value="Confirmar cambios"
					className="bg-green-500 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4"
				/>
			</div>
		</form>
	)
}
