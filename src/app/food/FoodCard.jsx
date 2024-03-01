/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function FoodCard({ food }) {
	return (
		<div className="mt-6 flex justify-center transition-transform transform hover:scale-105  hover:cursor-pointer">
			<div className="relative flex w-full p-4 max-w-[32rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
				<div className="w-24">
					<img
						src="/storage.svg"
						alt="storage"
						className="h-auto w-auto object-cover"
					/>
				</div>
                <div className="flex flex-col w-full p-4">
                    <div className="flex flex-col items-start justify-between w-full h-full">
                        <div>
                            <h3 className="text-xl font-bold">{food.name}</h3>
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <div className="flex flex-row items-center justify-center w-full gap-5">
                                <Tags
                                    svg={<img src="/storage.svg" alt="storage" />}
                                    text={food.quantity}
                                    color={'text-[#117b34] bg-[#EEFDF3]'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	)
}

function Tags({ svg, text, color }) {
	return (
		<div
			className={
				'text-xs inline-flex gap-2 items-center leading-sm px-3 py-1 rounded' +
				color
			}
		>
			<span>{text}</span>
		</div>
	)
}
