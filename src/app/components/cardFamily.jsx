/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Tag from './tag'

export default function CardFamily({ family }) {
	return (
		<div className="border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full max-w-[406px] rounded-xl">
			<div className="flex">
				<div className="mr-3">
					<img src="/family.svg" width={100} alt="family" />
				</div>
				<div className="flex flex-col justify-center w-full">
					<h2>{family.name}</h2>
					<div className={'flex justify-end gap-2 mt-2'}>
						<Tag
							pathsvg={'/truck.svg'}
							text={family.deliveries.length}
							color={'bg-gray-100'}
							textColor={'text-gray-400'}
						/>
						{family.is_call && (
							<Tag pathsvg={'/call.svg'} color={'bg-blue-100'} isOnlyIcon />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
