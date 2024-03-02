import Link from 'next/link'
import Modal from './modal.jsx'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Card from '../components/card.jsx'
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchFamilies } from './fetchFamilies.js'

export default async function BeneficiariesList() {
	const data = await fetchFamilies()

	return (
		<div className="flex h-full flex-col md:flex-row overflow-x-hidden">
			<Sidebar />
			<div className="left-80 relative w-full overflow-x-hidden">
				<div className="-ml-56 min-h-24 w-full fixed bg-white z-10">
					<Searchbar />
				</div>
				<main className="h-screen w-screen max-w-[1600px] p-6 md:p-12">
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
