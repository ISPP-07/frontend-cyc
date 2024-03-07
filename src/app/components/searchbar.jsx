'use client'
import Image from 'next/image'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const Searchbar = ({
	text = 'Dar de alta',
	handleClick = () => {
		console.log('Funciona')
	}
}) => {
	return (
		<div className="flex w-full justify-end mt-5">
			<div className="flex justify-around items-center md:w-full w-3/4 p-3 gap-1">
				<div className="flex w-10/12 border-solid border-[1px] border-gray-400 rounded-full p-1">
					<button className="outline-none focus:outline-none pl-1">
						<Image src="/magnifier.svg" width={18} height={18} />
					</button>
					<input
						type="search"
						placeholder="Buscar..."
						className="w-full pl-2 bg-transparent outline-none"
					/>
				</div>
				<button className="bg-blue-500 rounded-full p-2 shadow-lg">
					<Image src="/filter.svg" width={18} height={18} />
				</button>
				<button
					className="bg-[#75AF73] text-white p-2 md:px-3 rounded-full shadow-lg"
					onClick={handleClick}
				>
					<Image
						src="/plus.svg"
						width={18}
						height={18}
						className="lg:hidden md:block"
					/>
					<span className="hidden lg:block text-sm">{text}</span>
				</button>
			</div>
		</div>
	)
}
export default Searchbar
