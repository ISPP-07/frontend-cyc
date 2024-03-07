import CreateUserForm from '../components/CreateUserForm'
import React from 'react'
import Sidebar from '../components/sidebar'

export default function Home() {
	return (
		<main className="flex wallpaper w-full h-screen text-black">
			<Sidebar />
			<div className="w-full h-full flex items-center justify-center">
				<CreateUserForm />
			</div>
		</main>
	)
}
