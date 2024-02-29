'use client'
import Image from 'next/image'

const Searchbar = () => {
	return (
		<div className="absolute top-10 left-1/4 w-4/6 h-10 flex items-center">
			<Image
				width={18}
				height={18}
				src="/magnifier.svg"
				className="relative z-10 ml-1"
			></Image>
			<input
				className="absolute rounded-3xl border h-9 font-Varela w-9/12 text-black indent-2.5 pl-6"
				type="text"
				placeholder=" Buscar.. "
			/>
			<button className="bg-blue-500 ml-auto mr-6 relative rounded-full font-Varela text-xs w-8 h-8	">
				<Image
					src="/filter.svg"
					className="ml-1.5"
					width={20}
					height={20}
				></Image>
			</button>
			<button className="bg-green-700 text-white relative rounded-full font-Varela text-sm w-2/12 h-8 float-right">
				Dar de alta
			</button>
		</div>
	)
}
export default Searchbar
