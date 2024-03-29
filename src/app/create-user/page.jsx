import CreateUserForm from '../components/CreateUserForm'
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar'

export default function Home() {
	return (
		<main className="flex wallpaper w-full h-screen text-black">
			<Suspense fallback={<div>Cargando...</div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex items-center justify-center">
				<CreateUserForm />
			</div>
		</main>
	)
}
