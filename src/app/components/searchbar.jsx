'use client'
import Image from 'next/image'

const Searchbar = () => {
	return (
		<div className='absolute top-10 left-1/4 w-4/6 h-10 flex justify-start items-center'>
			<Image width={18} height={18} src="/magnifier.svg" className='relative z-10 ml-1'></Image>
			<input className="absolute rounded-3xl border h-9 font-Varela w-full text-black indent-2.5 pl-6" type="text" placeholder=" Buscar.. " />
		</div>
	)
}
export default Searchbar
