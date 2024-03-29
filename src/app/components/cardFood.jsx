/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Tag from './tag'

export default function CardFood({ food, handleClick }) {
	return (
		<div
			className={`flex border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full min-w-[300px] max-w-[300px] rounded-xl hover:scale-105 hover:cursor-pointer ${
				isExpiringSoon(food.exp_date) ? 'border-red-500' : 'border-gray-100'
			}`} // Cambiar el borde a rojo si la fecha de vencimiento está a menos de un mes de distancia, de lo contrario, cambiarlo a blanco
			onClick={handleClick}
		>
			<div className="mr-3">
				<img src="/storage.svg" width={100} alt="storage" />
			</div>
			<div className="flex flex-col justify-between w-full">
				<strong className="text-xl">{food.name}</strong>
				<div className={'flex justify-end gap-2 mt-2'}>
					{food.exp_date}
					{food.quantity && (
						<Tag
							pathsvg={'/storage-box.svg'}
							color={'bg-gray-100'}
							textColor={'text-black'}
							text={food.quantity}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
const isExpiringSoon = expiryDate => {
	const today = new Date()
	const expDate = new Date(expiryDate)

	const diffTime = Math.abs(expDate - today)
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	if (expDate < today || diffDays <= 30) {
		return true
	}

	return false
}
