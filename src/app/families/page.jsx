'use client'
import Link from 'next/link'
import Modal from './modal.jsx'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Card from '../components/card.jsx'
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchFamilies } from './fetchFamilies.js'
import exportData from '../exportData.js'
import Image from 'next/image.js'

export default async function BeneficiariesList({ searchParams }) {
	const data = await fetchFamilies()
	const show = searchParams?.show === 'true'
	const showModal = () => {
		window.location.href = '/families?show=true'
	}
	console.log(data[1])

	return (
		<div className="flex h-full flex-col md:flex-row overflow-x-hidden">
			<Sidebar />
			<div className="left-80 relative w-full overflow-x-hidden">
				<div className="-ml-56 min-h-24 w-full fixed bg-white z-10">
					<Searchbar onClickFunction={showModal} />
				</div>
				<main className="h-screen w-screen max-w-[1600px] p-6 md:p-12 flex flex-col">
					<div className="h-12 w-12 top-28 absolute" >
						<button className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2" onClick={()=>exportData(data,'Familias')}>
							<Image
								src="/excel.svg"
								className="ml-2"
								width={15}
								height={15}>	
							</Image>
						</button>
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
