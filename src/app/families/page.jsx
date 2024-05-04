'use client'
import Link from 'next/link'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchFamilies } from './fetchFamilies.js'
import { exportData } from '../exportData.js'
import Image from 'next/image.js'
import axios from 'axios'
import CardFamily from '../components/cardFamily.jsx'
import Modal from '../families/modal.jsx'
import Pagination from '@mui/material/Pagination'
import Select from 'react-select'
import { createAxiosInterceptors } from '../axiosConfig.js'

export default function FamiliesList() {
	const [data, setData] = useState(null)
	const [allData, setAllData] = useState(null)
	const [filteredData, setFilteredData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [perPage, setPerPage] = useState(20)
	const [expired, setExpired] = useState(false)
	const [showPagination, setShowPagination] = useState(true)

	useEffect(() => {
		createAxiosInterceptors()
	}, [])

	const selectOpts = [
		{ label: '20', value: 20 },
		{ label: '40', value: 40 },
		{ label: '80', value: 80 }
	]

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	const handleExport = async () => {
		try {
			const familyData = await fetchFamilies()
			exportData(familyData.elements, 'Familias', {
				name: 'Nombre',
				phone: 'Teléfono',
				address: 'Dirección',
				referred_organization: 'Hermandad',
				next_renewal_date: 'Fecha de renovación',
				derecognition_state: 'Estado',
				observation: 'Observaciones',
				number_of_people: 'Número de personas',
				members: 'Miembros'
			})
		} catch (error) {
			console.error('Error al cargar los datos para la exportación:', error)
			alert(
				'Se produjo un error al cargar los datos para la exportación. Por favor, inténtalo de nuevo.'
			)
		}
	}
	const handleFileChange = async event => {
		const selectedFile = event.target.files[0]
		try {
			const formData = new FormData()
			formData.append('file', selectedFile)
			await axios.post('url/de/import', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			alert('Datos importados correctamente')
		} catch (error) {
			console.error(error)
			alert('Error al importar los datos')
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchFamilies(perPage, (page - 1) * perPage)
				setTotalPages(Math.ceil(data.total_elements / perPage))
				setData(data.elements)
				setFilteredData(data.elements)
				const allData = await fetchFamilies()
				setAllData(allData.elements)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [page, perPage])

	const handleSearch = searchTerm => {
		if (!searchTerm) {
			setData(data)
			setFilteredData(data)
		} else {
			const filtered = allData.filter(family =>
				family.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
			setFilteredData(filtered)
		}
	}

	const handlePageChange = (event, value) => {
		setPage(value)
	}
	const handleSelect = opt => {
		setPerPage(opt?.value)
	}
	const isExpiringSoon = expiryDate => {
		const today = new Date()
		const expDate = new Date(expiryDate)

		const diffTime = Math.abs(expDate - today)
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		if (expDate < today || diffDays <= 30) {
			return true
		}

		return false
	}

	const handleFilterExpired = () => {
		if (expired) {
			setExpired(false)
			setShowPagination(true)
			setFilteredData(data)
		} else {
			setShowPagination(false)
			setExpired(true)
			const filtered = allData.filter(family =>
				isExpiringSoon(family.next_renewal_date)
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
					handleSearch={handleSearch}
					stext="Dar de alta"
					page="family"
					handleFilterView={handleFilterExpired}
					searchText={'Buscar familia...'}
				/>
				<div className="h-12 w-max flex flex-row">
					<button
						className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
						onClick={() => handleExport()}
					>
						<Image
							src="/excel.svg"
							className="ml-2"
							width={15}
							height={15}
						></Image>
					</button>
					<label
						htmlFor="file"
						className="bg-green-400 w-32 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm"
					>
						Importar datos
					</label>
					<input
						type="file"
						id="file"
						onChange={handleFileChange}
						style={{ display: 'none' }}
						accept=".xls"
					/>
				</div>
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					<Suspense fallback={<div>Cargando...</div>}>
						{filteredData &&
							filteredData.map(family => (
								<Link href={`/families/${family.id}`} key={family.id}>
									<CardFamily key={family.id} family={family} />
								</Link>
							))}
					</Suspense>
				</div>
				{showPagination && (
					<div>
						<Pagination
							count={totalPages}
							initialpage={1}
							onChange={handlePageChange}
							className="flex flex-wrap justify-center items-center"
						/>
						<div className="flex justify-center items-center m-2">
							<p>Número de elementos:</p>
							<Select
								options={selectOpts}
								defaultValue={{ label: '20', value: 20 }}
								isSearchable={false}
								isClearable={false}
								onChange={handleSelect}
								className="m-2"
							/>
						</div>
					</div>
				)}
			</div>
			{showModal ? <Modal closeModal={toggleModal} /> : null}
		</main>
	)
}
