'use client'
import Link from 'next/link'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../../components/sidebar.jsx'
import Searchbar from '../../components/searchbar.jsx'
import { fetchFamilies } from './fetchFamilies.js'
import axios from 'axios'
import CardFamily from '../../components/cardFamily.jsx'
import Modal from '../../families/modal.jsx'
import { createAxiosInterceptors } from '@/app/axiosConfig.js'

export default function FamiliesList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	useEffect(() => {
		createAxiosInterceptors()
		const fetchData = async () => {
			try {
				const data = await fetchFamilies()
				setData(data)
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
		<main className='flex w-full'>
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className='w-full h-full flex flex-col items-center'>
				<Searchbar handleClick={toggleModal} stext='Dar de alta' />
				<div className='container p-10 flex flex-wrap gap-5 justify-center items-center'>
					<Suspense fallback={<div>Cargando...</div>}>
						{data?.length === 0 && (
							<h2> No hay datos de familias dadas de baja</h2>
						)}
						{data &&
							data.map(family => (
								<Link href={`/families/${family.id}`} key={family.id}>
									<CardFamily key={family.id} family={family} />
								</Link>
							))}
					</Suspense>
				</div>
			</div>
			{showModal ? <Modal closeModal={toggleModal} /> : null}
		</main>
	)
}
