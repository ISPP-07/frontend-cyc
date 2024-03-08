'use client'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from 'react'
/* eslint-enable no-unused-vars */
import AddElementForm from '../components/AddElementForm'

export default function Layout({ children }) {
	const [stateModal, setStateModal] = useState(false)

	const toggleModal = () => {
		setStateModal(!stateModal)
	}
	return (
		<main className="absolute bg-white w-full h-full">
			<div className="flex h-full flex-col md:flex-row overflow-x-hidden bg-white">
				<Suspense
					className="w-full h-full flex-none md:w-64 fixed z-20"
					fallback={<div>Cargando...</div>}
				>
					<Sidebar />
				</Suspense>
				<div className="left-80 relative w-full overflow-x-hidden">
					<div className="-ml-56 min-h-24 w-full fixed bg-white z-10">
						<Searchbar
							buttonText="Añadir elemento"
							onClickFunction={toggleModal}
						/>
					</div>
					<main className="p-6 md:p-12">{children}</main>
				</div>
				{stateModal ? <AddElementForm onClickFunction={toggleModal} /> : null}
			</div>
		</main>
	)
}
