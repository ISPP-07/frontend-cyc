/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
function Card({ family }) {
	const Users = (
		<div className="w-24">
			<img
				src="/family.svg"
				alt="user"
				className="h-full w-full object-cover"
			/>
		</div>
	)
	return (
		<div className="mt-6 flex justify-center transition-transform transform hover:scale-105  hover:cursor-pointer">
			<div className="relative flex w-full p-4 max-w-[32rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
				{Users}
				<div className="flex flex-col w-full p-4">
					<div className="flex flex-col items-start justify-between w-full h-full">
						<div>
							<h3 className="text-xl font-bold">{family.name}</h3>
						</div>
						<div className="flex flex-col items-start w-full">
							<div className="flex flex-row items-center justify-center w-full gap-5">
								<Tags
									svg={<img src="/truck.svg" alt="delivery" />}
									text={family.name}
									color="bg-gray-100 text-gray-500"
								/>
								{family.is_call ? (
									<Tags
										svg={<img src="/call.svg" alt="calendar" />}
										color="bg-blue-100 text-blue-500"
									/>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card

function Tags({ svg, text, color }) {
	return (
		<div
			className={
				'text-xs inline-flex gap-2 items-center leading-sm px-3 py-1 rounded-full ' +
				color
			}
		>
			<span>{svg}</span>
			<span>{text}</span>
		</div>
	)
}
