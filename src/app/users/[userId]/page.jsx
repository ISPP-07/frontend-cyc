'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import UserDetails from '../../components/UserDetails'
import Sidebar from '../../components/sidebar'
import { fetchDataUser } from './fetch'

export default function Page({ params }) {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await fetchDataUser(params.userId)
				setUser(user)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])
	return (
		<main className="flex bg-white wallpaper w-screen h-screen text-black">
			<Suspense fallback={<div></div>}>
				<Sidebar className="relative" />
			</Suspense>
			<div className="w-full h-full flex items-center justify-center">
				<UserDetails user={user} />
			</div>
		</main>
	)
}
