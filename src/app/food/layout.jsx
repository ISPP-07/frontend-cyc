'use client'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import AddElementForm from '../components/AddElementForm'
import { Suspense } from 'react'

export default function Layout({ children }) {
	const [isVisible, setIsVisible] = React.useState(false)
	const onClickFunction = () => {
		setIsVisible(!isVisible)
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
							onClickFunction={onClickFunction}
						/>
					</div>
					<main className="p-6 md:p-12">{children}</main>
					{isVisible ? (
						<div
							className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${isVisible ? 'z-30' : 'z-0'} `}
							id="close"
						>
							<div>
								<button
									className="text-gray-500 text-xl "
									onClick={onClickFunction}
								>
									X
								</button>
								<AddElementForm onClickFunction={onClickFunction} />
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</main>
	)
}
