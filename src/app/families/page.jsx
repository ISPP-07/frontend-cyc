'use client'
import Link from 'next/link'
import Modal from './modal.jsx'
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
/* eslint-enable no-unused-vars */
import Card from '../components/card.jsx'
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchFamilies } from './fetchFamilies.js'
import exportData from '../exportData.js'
import Image from 'next/image.js'
import axios from 'axios'


export default async function BeneficiariesList({ searchParams }) {
	const fileInputRef = useRef(null);

	const handleFileChange = async (event) => {
		const selectedFile = event.target.files[0]
		try{
			const formData = new FormData()
			formData.append('file',selectedFile)
			await axios.post('url/de/import',formData,{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			alert('Datos importados correctamente')
		}catch(error){
			console.error(error)
			alert('Error al importar los datos')
		}
	}
	const handleClick = () => {
		fileInputRef.current.click();
	  };
	
	const data = await fetchFamilies()
	const show = searchParams?.show === 'true'
	const showModal = () => {
		window.location.href = '/families?show=true'
	}

	return (
		<div className="flex h-full flex-col md:flex-row overflow-x-hidden">
			<Sidebar />
			<div className="left-80 relative w-full overflow-x-hidden">
				<div className="-ml-56 min-h-24 w-full fixed bg-white z-10">
					<Searchbar onClickFunction={showModal} />
				</div>
				<main className="h-screen w-screen max-w-[1600px] p-6 md:p-12 flex flex-col">
					<div className="h-12 w-max top-28 absolute flex flex-row" >
						<button className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2" onClick={()=>exportData(data,'Familias')}>
							<Image
								src="/excel.svg"
								className="ml-2"
								width={15}
								height={15}>	
							</Image>
						</button>
						<label htmlFor="file"className='bg-green-400 w-32 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm'>
							Importar  datos
						</label>
						<input type="file" id="file" onChange={handleFileChange} style={{display:'none'}} accept='.xls'/>
						
					</div>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
						{data.map(family => (
							<Link href={`/families/${family.id}`} key={family.id}>
								<Card key={family.id} family={family} />
							</Link>
						))}
					</div>
				</main>
			</div>
			{show && <Modal />}
		</div>
	)
}
