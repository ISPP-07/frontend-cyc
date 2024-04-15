'use client'
import CreateUserForm from '../components/CreateUserForm'
/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar'
import { createAxiosInterceptors } from '../axiosConfig'
import axios from 'axios'

export default function Home() {
	// Check the user is a master user
	useEffect(() => {
		const isMaster = async () => {
			const token = localStorage.getItem('jwt')
			if (!token) {
				window.location.href = '/'
			}
			createAxiosInterceptors()
			const res = await axios
				.get(process.env.NEXT_PUBLIC_BASE_URL + '/shared/user/master')
				.catch(_ => {
					window.location.href = '/'
				})
			if (!res.data.is_master) {
				window.location.href = '/'
			}
		}
		isMaster()
	}, [])

	return (
		<main className='flex wallpaper w-full h-screen text-black'>
			<Suspense fallback={<div>Cargando...</div>}>
				<Sidebar />
			</Suspense>
			<div className='w-full h-full flex items-center justify-center'>
				<CreateUserForm />
			</div>
		</main>
	)
}
