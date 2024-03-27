'use client'
import Image from 'next/image'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import ButtonIcon from './buttonIcon'
import ButtonText from './buttonText'

const Searchbar = ({
	text = 'Dar de alta',
	handleClick = () => {
		console.log('Funciona')
	}
}) => {
	return (
		<div className="flex w-full justify-end pt-3 self-start sticky top-0 left-0 bg-white">
			<div className="flex justify-around items-center md:w-full w-5/6 p-3 gap-1">
				<div className="flex w-10/12 border-solid border-[1px] border-gray-400 rounded-full p-1 focus-within:border-black">
					<button className="outline-none focus:outline-none pl-1">
						<Image src="/magnifier.svg" width={18} height={18} />
					</button>
					<input
						type="search"
						placeholder="Buscar..."
						className="w-full pl-2 bg-transparent outline-none"
					/>
				</div>
				<ButtonIcon color={'bg-blue-500'} iconpath={'/filter.svg'} />
				<div className="lg:hidden block">
					<ButtonIcon
						color={'bg-[#75AF73]'}
						iconpath={'/plus.svg'}
						handleClick={handleClick}
					/>
				</div>
				<div className="lg:block hidden">
					<ButtonText
						text={text}
						px={'md:px-3'}
						isRounded={true}
						color={'bg-[#75AF73]'}
						handleClick={handleClick}
					/>
				</div>
			</div>
		</div>
	)
}
export default Searchbar
