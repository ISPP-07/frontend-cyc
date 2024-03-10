/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function CardUser({ user }) {
	return (
		<div className="flex border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full min-w-[300px] max-w-[300px] rounded-xl hover:scale-105 hover:cursor-pointer">
			<div className="mr-3">
				<img src="/face.svg" width={100} alt="storage" />
			</div>
			<div className="flex flex-col justify-between w-full">
				<strong className="text-xl">{user.username}</strong>
			</div>
		</div>
	)
}
