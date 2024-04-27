'use client'
// Import all fetchers
import { fetchDeliveries } from '../deliveries/fetchDeliveries'
import { fetchDataFoods } from '../food/fetchDataFoods'
import { fetchFamilies } from '../families/fetchFamilies'
import { fetchDataWarehouse } from '../food/warehouse/fetchDataWarehouse'
// Import react and axios
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Suspense } from 'react'
import axios from 'axios'
// Import components
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar'
import { createAxiosInterceptors } from '../axiosConfig'
import Contador from './Contador'

export default function Dashboard() {
	const [deliveries, setDeliveries] = useState([])
	const [foods, setFoods] = useState([])
	const [warehouses, setWarehouses] = useState([])
	const [families, setFamilies] = useState([])

	// Check the user is a master user
	useEffect(() => {
		const loader = document.getElementById('loader')
		loader.classList.add('hidden')
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
			setWarehouses(await fetchDataWarehouse())
		}
		fetchData()
	}, [])

	return (
		<main className="flex wallpaper w-full h-screen text-black">
			<Suspense fallback={<div>Cargando...</div>}>
				<Sidebar className="relative" />
			</Suspense>
			{/* This vew contains horizontal panels, the first occupies 2/3 of the screen and contains two sections, one selectable for the type of data, and another one to add filters */}
			<Contador
				families={families}
				foods={foods}
				deliveries={deliveries}
				warehouses={warehouses}
			/>
		</main>
	)
}
