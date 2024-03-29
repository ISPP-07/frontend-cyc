'use client'
import Link from 'next/link'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchUsers } from './fetchUsers.js'
import CardUser from '../components/cardUser.jsx'
import { useRouter } from 'next/navigation.js'

export default function UserList() {
	const [data, setData] = useState(null)
	const router = useRouter()
	const toggleModal = () => {
		router.push('/create-user')
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchUsers()
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
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} text="Crear usuario" />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					<Suspense fallback={<div>Cargando...</div>}>
						{data?.length === 0 && (
							<h2> No hay datos de usuarios en el sistema</h2>
						)}
						{data &&
							data.map(user => (
								<Link
									href={`/users/${user.id}`}
									key={user.id}
									data-testid="card-user"
								>
									<CardUser key={user.id} user={user} />
								</Link>
							))}
					</Suspense>
				</div>
			</div>
		</main>
	)
}
