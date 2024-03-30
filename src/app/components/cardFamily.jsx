/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Tag from './tag'

export default function CardFamily({ family }) {
	return (
		<div className="flex border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full min-w-[300px] max-w-[300px] rounded-xl hover:scale-105 hover:cursor-pointer transition duration-100">
			<div className="mr-3">
				<img src="/family-2.svg" width={100} alt="family" />
			</div>
			<div className="flex flex-col justify-between w-full">
				<strong className="text-xl">{family.name}</strong>
				<div className={'flex justify-end gap-2 mt-2'}>
					{/* Add tags with following format */}
					{family.is_call && (
						<Tag pathsvg={'/call.svg'} color={'bg-blue-100'} isOnlyIcon />
					)}
					{family.derecognition_state === 'Suspended' && (
						<Tag
							pathsvg={'/no-family-strong.svg'}
							color={'bg-red-100'}
							text={'De baja'}
							textColor={'white'}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
