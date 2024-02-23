'use client'
import { useState } from 'react'
import Modal from './components/modal'
import Searchbar from './components/searchbar'
import Sidebar from './components/sidebar'

export default function Home() {
	const [verModal,setVerModal] = useState(false)
	return (
		<main className='wallpaper'>
			<Sidebar/>
			<Searchbar/>
			<Modal isVisible={verModal} onClose={()=>setVerModal(false)} />
			<button className={`bg-cyan-500 rounded-full top-[550px] relative w-[100px] h-[50px] right-[700px] ${verModal?'blur':''}`} onClick={()=>setVerModal(true)}> Probar modal</button>
		</main>
	)
}
