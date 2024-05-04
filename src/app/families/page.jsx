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
	const [filteredData, setFilteredData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [showExportModal, setShowExportModal] = useState(false)
	const [exportFormat, setExportFormat] = useState(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [perPage, setPerPage] = useState(20)
	const [expired, setExpired] = useState(false)

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
			const familyData = (await fetchFamilies()).elements
			if (exportFormat === 'app') {
				// Handle passports
				const dniRegExp = /^\d{8}[A-Z]$/
				const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
				data.forEach(fam => {
					fam.members.forEach(member => {
						if (
							!dniRegExp.test(member.nid) &&
							!nieRegExp.test(member.nid) &&
							member.nid !== null
						) {
							// Add P- to the passport number
							member.nid = `P-${member.nid}`
						}
					})
				})

				const familyData = []
				const memberData = []
				// The excel is divided in two parts, both in one sheet. The first part corresponds to the family data, then there is an empty column and the second part corresponds to the members data.
				data.forEach((family, index) => {
					familyData.push({
						index: index + 1,
						name: family.name,
						phone: family.phone,
						address: family.address,
						next_renewal_date: new Date(
							family.next_renewal_date
						).toLocaleDateString('es-ES'),
						derecognition_state:
							family.derecognition_state === 'Active' ? 'Activa' : 'Suspendida',
						referred_organization: family.referred_organization,
						observation: family.observation
					})
					family.members.forEach(member => {
						memberData.push({
							index_m: index + 1,
							// Birth Date in format DD/MM/YYYY
							date_birth: new Date(member.date_birth).toLocaleDateString(
								'es-ES'
							),
							name_m: member.name,
							surname: member.surname,
							nationality: member.nationality,
							nid: member.nid,
							family_head: member.family_head,
							gender: member.gender === 'Man' ? 'Hombre' : 'Mujer',
							functional_diversity: member.functional_diversity ? 'X' : '',
							// Food intolerances as a string of values separated by commas
							food_intolerances: member.food_intolerances.join(', '),
							homeless: member.homeless ? 'X' : ''
						})
					})
				})

				// Fuse family data and member data into one array with one empty column between them
				const expData = []
				for (let i = 0; i < memberData.length; i++) {
					if (familyData[i]) {
						const element = {
							...familyData[i],
							emptyColumn: '',
							...memberData[i]
						}
						expData.push(element)
					} else {
						const element = {
							index: '',
							name: '',
							phone: '',
							address: '',
							next_renewal_date: '',
							derecognition_state: '',
							referred_organization: '',
							observation: '',
							emptyColumn: '',
							...memberData[i]
						}
						expData.push(element)
					}
				}
				console.log(expData)

				// Define excel columns
				const cols = {
					index: 'numero familia',
					name: 'nombre',
					phone: 'numero telefono',
					address: 'direccion',
					next_renewal_date: 'fecha renovacion',
					derecognition_state: 'estado',
					referred_organization: 'organizacion referida',
					observation: 'observaciones',
					emptyColumn: '',
					index_m: 'numero familia',
					date_birth: 'fecha nacimiento',
					name_m: 'nombre',
					surname: 'apellido',
					nationality: 'nacionalidad',
					nid: 'documento identidad',
					family_head: 'cabeza de familia',
					gender: 'genero',
					functional_diversity: 'diversidad funcional',
					food_intolerances: 'intolerancia alimenticia',
					homeless: 'sin hogar'
				}

				exportData(expData, 'Familias', cols, true)
			} else {
				// Loop throught the families with index and value
				const data = []
				familyData.forEach((family, index) => {
					// Only include families that are not derecognised
					if (family.derecognition_state === 'Active') {
						// Loop through the members of the family
						let underageCounter = 0
						family.members.forEach(member => {
							let iniciales
							if (member.type === 'Child') {
								underageCounter++
								iniciales = 'MENOR ' + underageCounter
							} else {
								iniciales =
									member.name
										.split(' ')
										.map(name => name[0])
										.join('') +
									member.surname
										.split(' ')
										.map(name => name[0])
										.join('')
								iniciales.toUpperCase()
							}
							data.push({
								'Numero Unidad': index + 1,
								'Cabeza de Familia Marcar X': member.family_head ? 'X' : '',
								'Iniciales Nombre y Apellido Beneficiario': iniciales,
								'NIF/NIE/Pasaporte Beneficiario': member.nid,
								'Nacionalidad Beneficiario': member.nationality.toUpperCase(),
								// Birth Date in format YYYY-MM-DD
								'Fecha Nacimiento Beneficiario': member.date_birth
									.split('/')
									.reverse()
									.join('-'),
								'Sexo Beneficiario':
									member.gender === 'Man' ? 'MASCULINO' : 'FEMENINO'
							})
						})
					}
				})
				exportData(data, 'Familias', {
					'Numero Unidad': 'Número Unidad',
					'Cabeza de Familia Marcar X': 'Cabeza de Familia Marcar X',
					'Iniciales Nombre y Apellido Beneficiario':
						'Iniciales Nombre y Apellido Beneficiario',
					'NIF/NIE/Pasaporte Beneficiario': 'NIF/NIE/Pasaporte Beneficiario',
					'Nacionalidad Beneficiario': 'Nacionalidad Beneficiario',
					'Fecha Nacimiento Beneficiario': 'Fecha Nacimiento Beneficiario',
					'Sexo Beneficiario': 'Sexo Beneficiario'
				})
			}
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
			const filtered = data.filter(family =>
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
			setFilteredData(data)
		} else {
			setExpired(true)
			const filtered = data.filter(family =>
				isExpiringSoon(family.next_renewal_date)
			)
			setFilteredData(filtered)
		}
	}

	return (
		<main className='flex w-full'>
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className='w-full h-full flex flex-col items-center'>
				<Searchbar
					handleClick={toggleModal}
					handleSearch={handleSearch}
					stext='Dar de alta'
					page='family'
					handleFilterView={handleFilterExpired}
					searchText={'Buscar familia...'}
				/>
				<div className='h-12 w-max flex flex-row'>
					<button
						className=' bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2'
						onClick={() => setShowExportModal(true)}
					>
						<Image
							src='/excel.svg'
							className='ml-2'
							width={15}
							height={15}
						></Image>
					</button>
					<label
						htmlFor='file'
						className='bg-green-400 w-32 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm'
					>
						Importar datos
					</label>
					<input
						type='file'
						id='file'
						onChange={handleFileChange}
						style={{ display: 'none' }}
						accept='.xls'
					/>
				</div>
				<div className='container p-10 flex flex-wrap gap-5 justify-center items-center'>
					<Suspense fallback={<div>Cargando...</div>}>
						{filteredData &&
							filteredData.map(family => (
								<Link href={`/families/${family.id}`} key={family.id}>
									<CardFamily key={family.id} family={family} />
								</Link>
							))}
					</Suspense>
				</div>
				<div>
					<Pagination
						count={totalPages}
						initialpage={1}
						onChange={handlePageChange}
						className='flex flex-wrap justify-center items-center'
					/>
					<div className='flex justify-center items-center m-2'>
						<p>Número de elementos:</p>
						<Select
							options={selectOpts}
							defaultValue={{ label: '20', value: 20 }}
							isSearchable={false}
							isClearable={false}
							onChange={handleSelect}
							className='m-2'
						/>
					</div>
				</div>
			</div>
			{showModal ? <Modal closeModal={toggleModal} /> : null}
			{showExportModal ? (
				/* {  Ask if the user wants the export in the apps format or banco de alimentos format } */
				<div
					data-testid='modalOption'
					className='fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'
				>
					<div className='bg-white w-2/3 md:w-1/3 px-5 py-7 rounded-lg shadow-lg'>
						<h2 className='text-xl font-bold text-center'>
							¿En qué formato desea exportar los datos?
						</h2>
						<div className='flex justify-center mt-4'>
							<button
								className='border border-gray-300 text-black px-4 py-2 rounded-lg shadow-lg mr-2'
								onClick={() => {
									setExportFormat('app')
									setShowExportModal(false)
									handleExport()
								}}
							>
								Aplicación
							</button>
							<button
								className='border border-gray-300 text-black px-4 py-2 rounded-lg shadow-lg'
								onClick={() => {
									setExportFormat('banco')
									setShowExportModal(false)
									handleExport()
								}}
							>
								Banco de alimentos
							</button>
						</div>
					</div>
				</div>
			) : null}
		</main>
	)
}
