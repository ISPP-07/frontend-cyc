'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, use, useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../../components/sidebar'
import FoodDetails from '../../components/FoodDetails'
import { fetchDataFoods } from '../fetchDataFoods'
import { useParams } from 'next/navigation'
import { createAxiosInterceptors } from '@/app/axiosConfig'

export default function Page() {
	const params = useParams()
	const [food, setFood] = useState(null)

	useEffect(() => {
		const loader = document.getElementById('loader')
		loader.classList.add('hidden')
		createAxiosInterceptors()
		fetchDataFoods()
			.then(data => {
				const filteredData = data.elements.filter(food => food.id === params.id)
				setFood(filteredData)
			})
			.catch(error => {
				console.error('Error al obtener los datos:', error)
			})
	}, [])
	return (
		<main className="flex bg-white wallpaper w-screen h-screen text-black">
			<Suspense fallback={<div></div>}>
				<Sidebar className="relative" />
			</Suspense>
			<div className="w-full h-full flex items-center justify-center">
				{food ? (
					<FoodDetails food={food[0]} />
				) : (
					<div className="flex items-center justify-center w-full h-full">
						<p className="text-2xl font-poppins">Cargando...</p>
					</div>
				)}
			</div>
		</main>
	)
}
