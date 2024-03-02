import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import React from 'react'
export default function Layout({ children }) {
	return (
		<div className="flex h-full flex-col md:flex-row overflow-x-hidden">
			<Sidebar />
			<div className="left-80 relative w-full overflow-x-hidden">
				<div className="-ml-56 min-h-24 w-full fixed bg-white z-10">
					<Searchbar />
				</div>
				<main className="h-screen w-screen max-w-[1600px] p-6 md:p-12">
					{children}
				</main>
			</div>
		</div>
	)
}
