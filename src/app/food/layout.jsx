'use client'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import AddElementForm from '../components/AddElementForm'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Suspense } from 'react'

export default function Layout({ children }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	let state = searchParams?.get('showModal') === 'true'

	const toggleModal = () => {
		const params = new URLSearchParams(searchParams)
		params.set('showModal', (!state).toString())
		replace(`${pathname}?${params.toString()}`)
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
				{state ? <AddElementForm onClickFunction={toggleModal} /> : null}
			</div>
		</main>
	)
}
