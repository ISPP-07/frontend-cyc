'use client'
// Import all fetchers
import { fetchDeliveries } from '../deliveries/fetchDeliveries'
import { fetchDataFoods } from '../food/fetchDataFoods'
import { fetchFamilies } from '../families/fetchFamilies'
// Import react and axios
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
// Import components
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar'
import { createAxiosInterceptors } from '../axiosConfig'
import ButtonText from '../components/buttonText'
import Contador from './Contador'

export default function Dashboard() {
	const [deliveries, setDeliveries] = useState([])
	const [foods, setFoods] = useState([])
	const [families, setFamilies] = useState([])
	const [activeView, setActiveView] = useState('Contador')

	// Check the user is a master user
	useEffect(() => {
		const isMaster = async () => {
			const token = localStorage.getItem('jwt')
			if (!token) {
				window.location.href = '/'
			}
			createAxiosInterceptors()
			const res = await axios
				.get(process.env.NEXT_PUBLIC_BASE_URL + '/shared/auth/master')
				.catch(_ => {
					window.location.href = '/'
				})
			if (!res.data.is_master) {
				window.location.href = '/'
			}
		}
		isMaster()
	}, [])

	// Fetch all data
	useEffect(() => {
		const fetchData = async () => {
			setDeliveries((await fetchDeliveries()).elements)
			setFoods((await fetchDataFoods()).elements)
			setFamilies((await fetchFamilies()).elements)
		}
		fetchData()
	}, [])

	return (
		<main className='flex wallpaper w-full h-screen text-black'>
			<Suspense fallback={<div>Cargando...</div>}>
				<Sidebar className='relative' />
			</Suspense>
			<div className='w-full p-10 h-12 flex flex-col align-items'>
				{/* buttons for "Contador", "historia" and "Detalles", representando distintas vistas */}
				<div className='flex justify-center gap-5'>
					<ButtonText
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						text='Contador'
						px={'md:px-3'}
						isRounded={false}
						color={
							activeView === 'Contador'
								? 'bg-[#75AF73] hover:bg-[#04850D]'
								: 'bg-gray-300 hover:bg-gray-500'
						}
						handleClick={() => setActiveView('Contador')}
					></ButtonText>
					<ButtonText
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						text='Historia'
						px={'md:px-3'}
						isRounded={false}
						color={
							activeView === 'Historia'
								? 'bg-[#75AF73] hover:bg-[#04850D]'
								: 'bg-gray-300 hover:bg-gray-500'
						}
						handleClick={() => setActiveView('Historia')}
					></ButtonText>
					<ButtonText
						className='text-white font-bold py-2 px-4 rounded'
						text='Detalles'
						px={'md:px-3'}
						isRounded={false}
						color={
							activeView === 'Detalles'
								? 'bg-[#75AF73] hover:bg-[#04850D]'
								: 'bg-gray-300 hover:bg-gray-500'
						}
						handleClick={() => setActiveView('Detalles')}
					></ButtonText>
				</div>
				{/* Render the view selected */}
				{/* This vew contains horizontal panels, the first occupies 2/3 of the screen and contains two sections, one selectable for the type of data, and another one to add filters */}
				{activeView === 'Contador' && (
					<Contador families={families} foods={foods} deliveries={deliveries} />
				)}
			</div>
		</main>
	)
}
