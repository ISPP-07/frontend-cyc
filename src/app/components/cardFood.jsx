/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Tag from './tag'

export default function CardFood({ food }) {
	return (
		<div className="flex border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full min-w-[300px] max-w-[406px] rounded-xl hover:scale-105 hover:cursor-pointer">
			<div className="mr-3">
				<img src="/storage.svg" width={100} alt="storage" />
			</div>
			<div className="flex flex-col justify-between w-full">
				<strong className="text-xl">{food.name}</strong>
				<div className={'flex justify-end gap-2 mt-2'}>
					{/*Add tags with following format*/}
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
