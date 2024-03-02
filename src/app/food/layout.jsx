import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function Layout({ children }) {
	return (
		<main className="absolute bg-white w-full h-full ">
			<div className="flex h-full flex-col md:flex-row overflow-x-hidden bg-white">
				<div className="w-full h-full flex-none md:w-64 fixed z-20">
					<Sidebar />
				</div>
				<div className="left-80 relative w-full overflow-x-hidden">
					<div className="-ml-56 min-h-24 w-full fixed bg-white z-10">
						<Searchbar />
					</div>
					<main className="p-6 md:p-12">{children}</main>
				</div>
			</div>
		</main>
	)
}