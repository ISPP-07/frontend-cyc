'use client'
import Image from 'next/image'

const Searchbar = () => {
	return (
		<div className='absolute top-10 left-40 w-5/6 h-10 flex justify-center items-center'>
			<Image width={18} height={18} src="/magnifier.svg" className='absolute z-10 left-52'></Image>
			<input className="absolute rounded-3xl border h-9 font-Varela w-2/3 text-black indent-2.5 pl-6" type="text" placeholder=" Buscar.. " />
		</div>
	)
}
export default Searchbar
