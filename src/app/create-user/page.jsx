import CreateUserForm from '../components/CreateUserForm'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar'

export default function Home() {
	return (
		<main className="flex wallpaper w-screen h-screen text-black">
			<Sidebar className="relative" />
			<div className="w-full h-full flex items-center justify-center">
				<CreateUserForm />
			</div>
		</main>
	)
}
