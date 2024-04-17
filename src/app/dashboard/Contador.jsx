'use client'
// Import react and axios
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
// Import components
/* eslint-enable no-unused-vars */
import ButtonIcon from '../components/buttonIcon'
import Image from 'next/image'

export default function Contador({ families, foods, deliveries }) {
	// State for the type of data to show in the "Contador" view
	const [contadorType, setContadorType] = useState('Familias')
	const [contador, setContador] = useState(0)
	const [filters, setFilters] = useState([])
	const [operators, setOperators] = useState({})
	const [newFilter, setNewFilter] = useState({})

	// Update the contador data
	useEffect(() => {
		if (contadorType === 'Familias') {
			let filteredFamilies = families
			const familyFilters = filters.filter(filter => filter.familyFilter)
			for (const filter of familyFilters) {
				filteredFamilies = filteredFamilies.filter(filter.familyFilter)
			}

			// We extract the members from the filtered families
			let filteredMembers = filteredFamilies
				.map(family => family.members)
				.flat()
			const memberFilters = filters.filter(filter => filter.memberFilter)
			for (const filter of memberFilters) {
				filteredMembers = filteredMembers.filter(filter.memberFilter)
			}

			// Keep only families with members in the filtered members
			filteredFamilies = filteredFamilies.filter(family =>
				family.members.some(member => filteredMembers.includes(member))
			)

			setContador({
				families: filteredFamilies.length,
				members: filteredMembers.length
			})
		}
	}, [filters, contadorType, families, foods, deliveries])

	// Update the new filter state
	const updateNewFilter = filter => {
		setNewFilter({ ...newFilter, ...filter })
		// Set the operators for the selected reason
		switch (filter.reason) {
			case 'Baja':
				setOperators({
					text: '¿Familia de baja?',
					options: [
						{ value: 'true', label: 'Sí' },
						{ value: 'false', label: 'No' }
					]
				})
				break
			case 'Cabeza':
				setOperators({
					text: '¿Cabeza de familia?',
					options: [
						{ value: 'true', label: 'Sí' },
						{ value: 'false', label: 'No' }
					]
				})
				break
			case 'Sexo':
				setOperators({
					text: 'Sexo',
					options: [
						{ value: 'Man', label: 'Hombre' },
						{ value: 'Woman', label: 'Mujer' }
					]
				})
				break
			case 'Edad':
				setOperators({
					text: 'Rango de edad',
					options: [
						{ value: '0-17', label: 'Menores' },
						{ value: '18-64', label: 'Entre 18 y 65' },
						{ value: '65+', label: 'Mayores de 65' }
					]
				})
				break
			case 'Extranjero':
				setOperators({
					text: '¿Extranjero?',
					options: [
						{ value: 'true', label: 'Sí' },
						{ value: 'false', label: 'No' }
					]
				})
				break
			case 'Sin-techo':
				setOperators({
					text: '¿Sin techo?',
					options: [
						{ value: 'true', label: 'Sí' },
						{ value: 'false', label: 'No' }
					]
				})
				break
			case 'Minusvalido':
				setOperators({
					text: '¿Minusvalía?',
					options: [
						{ value: 'true', label: 'Sí' },
						{ value: 'false', label: 'No' }
					]
				})
				break
		}
	}

	const finalizeFilter = filter => {
		// Add filter text
		switch (filter.reason) {
			case 'Baja':
				if (filter.operator === 'true') {
					filter.text = 'Inluir solo familias de baja'
					filter.familyFilter = family =>
						family.derecognition_state === 'Inactive'
				} else {
					filter.text = 'Inluir solo familias no dadas de baja'
					filter.familyFilter = family =>
						family.derecognition_state === 'Active'
				}
				break
			case 'Cabeza':
				if (filter.operator === 'true') {
					filter.text = 'Inluir solo cabezas de familia'
					filter.memberFilter = member => member.family_head
				} else {
					filter.text = 'Inluir solo miembros no cabezas de familia'
					filter.memberFilter = member => !member.family_head
				}
				break
			case 'Sexo':
				filter.text = `Inluir solo ${filter.operatorText}`
				filter.memberFilter = member => member.gender === filter.operator
				break
			case 'Edad':
				filter.text = `Inluir solo miembros ${filter.operatorText}`
				if (filter.operator === '0-17') {
					filter.memberFilter = member =>
						new Date().getFullYear() -
							new Date(member.date_birth).getFullYear() <
						18
				} else if (filter.operator === '18-64') {
					filter.memberFilter = member =>
						new Date().getFullYear() -
							new Date(member.date_birth).getFullYear() >
							17 &&
						new Date().getFullYear() -
							new Date(member.date_birth).getFullYear() <
							65
				} else {
					filter.memberFilter = member =>
						new Date().getFullYear() -
							new Date(member.date_birth).getFullYear() >
						64
				}
				break
			case 'Extranjero':
				if (filter.operator === 'true') {
					filter.text = 'Inluir solo miembros extranjeros'
					filter.memberFilter = member =>
						!['ES', 'España', 'Español'].includes(member.nationality)
				} else {
					filter.text = 'Inluir solo miembros no extranjeros'
					filter.memberFilter = member =>
						['ES', 'España', 'Español'].includes(member.nationality)
				}
				break
			case 'Sin-techo':
				if (filter.operator === 'true') {
					filter.text = 'Inluir solo miembros sin techo'
					filter.memberFilter = member => member.homeless
				} else {
					filter.text = 'Inluir solo miembros no sin techo'
					filter.memberFilter = member => !member.homeless
				}
				break
			case 'Minusvalido':
				if (filter.operator === 'true') {
					filter.text = 'Inluir solo miembros con minusvalía'
					filter.memberFilter = member => member.functional_diversity
				} else {
					filter.text = 'Inluir solo miembros sin minusvalía'
					filter.memberFilter = member => !member.functional_diversity
				}
				break
		}
		setFilters([...filters, filter])
		setNewFilter({})
		setOperators({})
	}

	return (
		<div className='flex flex-col gap-1'>
			<section className='flex flex-col w-full p-10'>
				<div className='mb-10'>
					<h3 className='text-xl font-Varela mb-3 font-bold'>Recurso</h3>
					<Select
						options={[
							{ value: 'Familias', label: 'Familias y personas' },
							{ value: 'Entregas', label: 'Entregas' },
							{ value: 'Alimentos', label: 'Alimentos' }
						]}
						onChange={e => setContadorType(e.value)}
						defaultValue={{
							value: 'Familias',
							label: 'Familias y personas'
						}}
					/>
				</div>
				<hr />
				<div className='p-10'>
					<h3 className='text-xl font-Varela mb-3 font-bold'>Filtros</h3>
					{/* Filters can be added or removed. Filters contain a "reason", and an "operator". reason and operator are selectables, and values are an input */}
					<div className='flex flex-col gap-5'>
						{filters.length ? (
							filters.map((filter, index) => (
								<div key={index} className='flex flex-row gap-5'>
									{/* remove btn */}
									<ButtonIcon
										color={'bg-red-500'}
										iconpath={'/trash.svg'}
										handleClick={() => {
											setFilters(filters.filter((_, i) => i !== index))
										}}
									/>
									<p className='text-lg font-Varela'>{filter.text}</p>
								</div>
							))
						) : (
							<p className='text-xlg font-Varela'>No hay filtros</p>
						)}
					</div>
					{/* Add filter Selectable */}
					<h3 className='text-xl font-Varela mb-3 mt-5 font-bold'>
						Nuevo Filtro
					</h3>
					<div className='flex flex-wrap gap-5 w-full'>
						<div className='flex grow flex-col gap-3'>
							<p className='text-lg font-Varela'>Razón</p>
							<Select
								options={[
									{ value: 'Baja', label: 'Dados de baja' },
									{ value: 'Cabeza', label: 'Cabeza de familia' },
									{ value: 'Sexo', label: 'Sexo' },
									{ value: 'Edad', label: 'Rango de edad' },
									{ value: 'Extranjero', label: 'Extranjeros' },
									{ value: 'Sin-techo', label: 'Sin-techo' },
									{ value: 'Minusvalido', label: 'Minusvalía' }
								]}
								onChange={e => updateNewFilter({ reason: e.value })}
							/>
						</div>
						{newFilter.reason && (
							<div className='flex grow flex-col gap-3'>
								<p className='text-lg font-Varela'>{operators.text}</p>
								<Select
									options={operators.options}
									onChange={e =>
										updateNewFilter({
											operator: e.value,
											operatorText: e.label
										})
									}
								/>
							</div>
						)}
						{newFilter.operator && (
							<button
								className={
									'bg-green-500 rounded-full text-white p-2 shadow-lg w-10 h-10 self-end flex justify-center'
								}
								onClick={() => {
									finalizeFilter(newFilter)
								}}
							>
								<Image src='/plus.svg' width='18' height='18' />
							</button>
						)}
					</div>
				</div>
				<hr />
				<section className='flex flex-col w-full p-10 h-full'>
					<div className='flex flex-wrap gap-5'>
						{/* This section shows the data of the selected type */}
						{contadorType === 'Familias' && (
							<>
								<div className='flex flex-col gap-5'>
									<h3 className='text-xl font-Varela mb-3 font-bold'>
										Familias
									</h3>
									<p className='text-lg font-Varela'>
										Total: {contador.families}
									</p>
								</div>
								<div className='flex flex-col gap-5'>
									<h3 className='text-xl font-Varela mb-3 font-bold'>
										Miembros
									</h3>
									<p className='text-lg font-Varela'>
										Total: {contador.members}
									</p>
								</div>
							</>
						)}
					</div>
				</section>
			</section>
		</div>
	)
}
