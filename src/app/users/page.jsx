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
import { createAxiosInterceptors } from '../axiosConfig.js'
import addHiddenClass from '../addHiddenClass.js'
import removeHiddenClass from '../removeHiddenClass.js'

export default function UserList() {
	const [data, setData] = useState(null)
	const [filteredData, setFilteredData] = useState(null)
	const router = useRouter()
	const toggleModal = () => {
		router.push('/create-user')
	}

	useEffect(() => {
		addHiddenClass()
		createAxiosInterceptors()
		const fetchData = async () => {
			try {
				const data = await fetchUsers()
				setData(data)
				setFilteredData(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	const handleSearch = searchTerm => {
		if (!searchTerm) {
			setData(data)
			setFilteredData(data)
		} else {
			const filtered = data.filter(user =>
				user.username.toLowerCase().includes(searchTerm.toLowerCase())
			)
			setFilteredData(filtered)
		}
	}

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar
					handleClick={toggleModal}
					text="Crear usuario"
					handleSearch={handleSearch}
					searchText={'Buscar usuario...'}
				/>
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					<Suspense fallback={<div>Cargando...</div>}>
						{filteredData?.length === 0 && (
							<h2> No hay datos de usuarios en el sistema</h2>
						)}
						{filteredData &&
							filteredData.map(user => (
								<Link
									onClick={removeHiddenClass}
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
