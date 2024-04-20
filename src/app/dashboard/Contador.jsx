'use client'
// Import react and axios
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
// Import components
/* eslint-enable no-unused-vars */
import ButtonIcon from '../components/buttonIcon'
import Image from 'next/image'
// Import charting library
import { PieChart } from 'react-minimal-pie-chart'

export default function Contador({ families, foods, deliveries, warehouses }) {
	// State for the type of data to show in the "Contador" view
	const [contadorType, setContadorType] = useState('Family')
	const [contador, setContador] = useState(0)
	const [filterOptions, setFilterOptions] = useState([
		{ value: 'Baja', label: 'Dados de baja' },
		{ value: 'Cabeza', label: 'Cabeza de familia' },
		{ value: 'Sexo', label: 'Sexo' },
		{ value: 'Edad', label: 'Rango de edad' },
		{ value: 'Extranjero', label: 'Extranjeros' },
		{ value: 'Sin-techo', label: 'Sin-techo' },
		{ value: 'Minusvalido', label: 'Minusvalía' }
	])
	const [filters, setFilters] = useState([])
	const [operators, setOperators] = useState({})
	const [newFilter, setNewFilter] = useState({})

	// Pie chart state
	const [highContrast, setHighContrast] = useState(false)

	// Update the contador data
	useEffect(() => {
		if (contadorType === 'Family') {
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
		} else if (contadorType === 'Food') {
			let filteredFoods = foods
			const foodFilters = filters.filter(filter => filter.filter)
			for (const filter of foodFilters) {
				filteredFoods = filteredFoods.filter(filter.filter)
			}

			setContador({
				foods: filteredFoods.length
			})
		}
	}, [filters, contadorType, families, foods, deliveries, warehouses])

	// Reset filters on update
	useEffect(() => {
		setFilters([])
		setNewFilter({})
		setOperators({})
		switch (contadorType) {
			case 'Family':
				setFilterOptions([
					{ value: 'Baja', label: 'Dados de baja' },
					{ value: 'Cabeza', label: 'Cabeza de familia' },
					{ value: 'Sexo', label: 'Sexo' },
					{ value: 'Edad', label: 'Rango de edad' },
					{ value: 'Extranjero', label: 'Extranjeros' },
					{ value: 'Sin-techo', label: 'Sin-techo' },
					{ value: 'Minusvalido', label: 'Minusvalía' }
				])
				break
			case 'Food':
				setFilterOptions([
					{ value: 'Incluye', label: 'Incluye palabra(s)' },
					{ value: 'Expira', label: 'Expira antes de' },
					{ value: 'Almacen', label: 'Almacén' }
				])
				break
		}
	}, [contadorType])

	// Update the new filter state
	/* eslint-disable no-unused-vars */
	const updateFoodNewFilter = filter => {
		setNewFilter({ ...newFilter, ...filter })
		// Set the operators for the selected reason
		switch (filter.reason) {
			case 'Incluye':
				setOperators({
					text: 'Incluye palabra(s)',
					type: 'text'
				})
				break
			case 'Expira':
				setOperators({
					text: 'Expira antes de',
					type: 'date'
				})
				break
			case 'Almacen':
				setOperators({
					text: 'Almacén',
					options: warehouses.map(warehouse => ({
						value: warehouse.id,
						label: warehouse.name
					}))
				})
				break
		}
	}

	const finalizeFoodFilter = filter => {
		// Add filter text
		switch (filter.reason) {
			case 'Incluye':
				{
					const words = filter.operator.split(',').map(word => word.trim())
					filter.text = `Incluye ${words.join(', ')}`
					filter.filter = food => food.name.includes(filter.operator)
				}
				break
			case 'Expira':
				filter.text = `Expira antes de ${filter.operator}`
				filter.filter = food =>
					new Date(food.exp_date) < new Date(filter.operator)
				break
			case 'Almacen':
				{
					const almacen = warehouses.find(
						warehouse => warehouse.id === filter.operator
					)
					filter.text = `Pertenece al almacén "${almacen.name}"`
					filter.filter = food => food.warehouse_id === filter.operator
				}
				break
		}
		const newFilters = filters.filter(f => f.reason !== filter.reason)
		setFilters([...newFilters, filter])
		setNewFilter({})
		setOperators({})
	}

	// Update the new filter state
	const updateFamilyNewFilter = filter => {
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
						{ value: '0-3', label: 'De 0 a 3 años' },
						{ value: '4-15', label: 'De 4 a 15 años' },
						{ value: '16-45', label: 'De 16 a 45 años' },
						{ value: '46-60', label: 'De 46 a 60 años' },
						{ value: '60+', label: 'Mayores de 60 años' }
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

	const finalizeFamilyFilter = filter => {
		// Add filter text
		switch (filter.reason) {
			case 'Baja':
				if (filter.operator === 'true') {
					filter.text = 'Incluir solo familias de baja'
					filter.familyFilter = family =>
						family.derecognition_state === 'Suspended'
				} else {
					filter.text = 'Incluir solo familias no dadas de baja'
					filter.familyFilter = family =>
						family.derecognition_state === 'Active'
				}
				break
			case 'Cabeza':
				if (filter.operator === 'true') {
					filter.text = 'Incluir solo cabezas de familia'
					filter.memberFilter = member => member.family_head
				} else {
					filter.text = 'Incluir solo miembros no cabezas de familia'
					filter.memberFilter = member => !member.family_head
				}
				break
			case 'Sexo':
				filter.text = `Incluir solo ${filter.operatorText}`
				filter.memberFilter = member => member.gender === filter.operator
				break
			case 'Edad':
				filter.text = `Filtrar por miembros ${filter.operatorText}`
				switch (filter.operator) {
					case '0-3':
						filter.memberFilter = member =>
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() <=
							4
						break
					case '4-15':
						filter.memberFilter = member =>
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() >=
								4 &&
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() <=
								15
						break
					case '16-45':
						filter.memberFilter = member =>
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() >=
								16 &&
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() <=
								45
						break
					case '46-60':
						filter.memberFilter = member =>
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() >=
								46 &&
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() <=
								60
						break
					case '60+':
						filter.memberFilter = member =>
							new Date().getFullYear() -
								new Date(member.date_birth).getFullYear() >=
							61
						break
				}
				break
			case 'Extranjero':
				if (filter.operator === 'true') {
					filter.text = 'Incluir solo miembros extranjeros'
					filter.memberFilter = member =>
						!['ES', 'España', 'Español'].includes(member.nationality)
				} else {
					filter.text = 'Incluir solo miembros no extranjeros'
					filter.memberFilter = member =>
						['ES', 'España', 'Español'].includes(member.nationality)
				}
				break
			case 'Sin-techo':
				if (filter.operator === 'true') {
					filter.text = 'Incluir solo miembros sin techo'
					filter.memberFilter = member => member.homeless
				} else {
					filter.text = 'Incluir solo miembros no sin techo'
					filter.memberFilter = member => !member.homeless
				}
				break
			case 'Minusvalido':
				if (filter.operator === 'true') {
					filter.text = 'Incluir solo miembros con minusvalía'
					filter.memberFilter = member => member.functional_diversity
				} else {
					filter.text = 'Incluir solo miembros sin minusvalía'
					filter.memberFilter = member => !member.functional_diversity
				}
				break
		}
		const newFilters = filters.filter(f => f.reason !== filter.reason)
		setFilters([...newFilters, filter])
		setNewFilter({})
		setOperators({})
	}
	/* eslint-enable no-unused-vars */

	return (
		<div className='flex flex-wrap w-full grow py-10'>
			<section className='grow flex flex-col p-10'>
				<div className='mb-10'>
					<h3 className='text-xl font-Varela mb-3 font-bold'>Recurso</h3>
					<Select
						options={[
							{ value: 'Family', label: 'Familias y personas' },
							{ value: 'Food', label: 'Alimentos' }
						]}
						onChange={e => setContadorType(e.value)}
						defaultValue={{
							value: 'Family',
							label: 'Familias y personas'
						}}
					/>
				</div>
				<hr />
				<div className='p-10'>
					<h3 className='text-xl font-Varela mb-3 font-bold'>Filtros</h3>
					{/* Filters can be added or removed. Filters contain a "reason", and an "operator". reason and operator are selectables, and values are an input */}
					{/* Add filter Selectable */}
					<div className='flex flex-wrap gap-5 w-full'>
						<div className='flex grow flex-col gap-3'>
							<p className='text-lg font-Varela'>Razón</p>
							<Select
								options={filterOptions}
								onChange={e => {
									if (['Family', 'Food'].includes(contadorType)) {
										/* eslint-disable no-eval */
										eval(`update${contadorType}NewFilter`)({ reason: e.value })
									}
								}}
							/>
						</div>
						{newFilter.reason && (
							<div className='flex grow flex-col gap-3'>
								<p className='text-lg font-Varela'>{operators.text}</p>
								{operators.options ? (
									<Select
										options={operators.options}
										onChange={e => {
											if (['Family', 'Food'].includes(contadorType)) {
												/* eslint-disable no-eval */
												eval(`update${contadorType}NewFilter`)({
													operator: e.value,
													operatorText: e.label
												})
											}
										}}
									/>
								) : (
									<input
										type={operators.type}
										className='p-1 w-full rounded-l bg-white placeholder-gray-300 border grow border-gray-300'
										placeholder='palabra1, palabra2'
										onChange={e => {
											if (['Family', 'Food'].includes(contadorType)) {
												/* eslint-disable no-eval */
												eval(`update${contadorType}NewFilter`)({
													operator: e.target.value
												})
											}
										}}
									/>
								)}
							</div>
						)}
						{newFilter.operator && (
							<button
								className={
									'bg-green-500 rounded-full text-white p-2 shadow-lg w-10 h-10 self-end flex justify-center'
								}
								onClick={() => {
									if (['Family', 'Food'].includes(contadorType)) {
										/* eslint-disable no-eval */
										eval(`finalize${contadorType}Filter`)(newFilter)
									}
								}}
							>
								<Image src='/plus.svg' width='18' height='18' />
							</button>
						)}
					</div>
					<div className='flex flex-col gap-5 py-3'>
						{filters.length ? (
							<>
								<p className='text-xlg font-Varela text-gray-500'>
									Filtros activos
								</p>
								{filters.map((filter, index) => (
									<div key={index} className='flex flex-row gap-5 align-center'>
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
								))}
							</>
						) : (
							<p className='text-xlg font-Varela text-gray-500'>
								Añade tu primer filtro
							</p>
						)}
					</div>
				</div>
				<hr className='md:hidden' />
			</section>
			{/* Show a vertical separator on big screens */}
			<div className='hidden md:block w-[3px] bg-gray-100 h-full'></div>
			<section className='flex flex-col p-10 h-full md:w-1/2'>
				<div className='flex flex-col gap-5'>
					{/* Select high contrast */}
					<div className='flex flex-row gap-3 items-center'>
						<input
							type='checkbox'
							className='p-1 w-5 h-5 rounded-full bg-white placeholder-gray-300 border border-gray-300'
							onChange={e => setHighContrast(e.target.checked)}
						/>
						<p className='text-lg font-Varela'>Alto contraste</p>
					</div>
					{/* This section shows the data of the selected type  via pie charts */}
					{contadorType === 'Family' && (
						<>
							<div className='flex flex-col gap-5'>
								<h3 className='text-xl font-Varela mb-3 font-bold'>Familias</h3>
								{/* Leyend */}
								<div className='flex flex-wrap gap-5'>
									<div className='flex flex-row gap-2 items-center'>
										<div className='w-5 h-5 bg-[#E38627]'></div>
										<p className='text-lg font-Varela'>Resto de Familias</p>
									</div>
									<div className='flex flex-row gap-2 items-center'>
										<div
											className={`w-5 h-5 ${highContrast ? 'bg-[#16A34A]' : 'bg-[#C13C37]'}`}
										></div>
										<p className='text-lg font-Varela'>Familias Filtradas</p>
									</div>
								</div>
								<div className='flex flex-wrap gap-5 items-center'>
									<PieChart
										className='max-w-60 max-h-60'
										animate
										data={[
											{
												title: 'Familias totales',
												value: families.length - contador.families,
												color: '#E38627'
											},
											{
												title: 'Familias filtradas',
												value: contador.families,
												color: highContrast ? '#16A34A' : '#C13C37'
											}
										]}
										style={{
											fontFamily:
												'"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
											fontSize: '8px'
										}}
										lineWidth={60}
										segmentsStyle={{
											transition: 'stroke .3s',
											cursor: 'pointer'
										}}
										labelPosition={100 - 60 / 2}
										labelStyle={{
											fill: '#fff',
											opacity: 0.75,
											pointerEvents: 'none'
										}}
										label={({ dataEntry }) =>
											Math.round(dataEntry.percentage) + '%'
										}
									/>
									<div className='flex-1 flex-wrap gap-5'>
										<h3 className='text-xl font-Varela mb-3'>
											{families.length} Familias en total
										</h3>
										<h3 className='text-xl font-Varela mb-3'>
											{contador.families} Familias Filtradas
										</h3>
									</div>
								</div>
								<hr />
								<h3 className='text-xl font-Varela mb-3 font-bold'>Miembros</h3>
								{/* Leyend */}
								<div className='flex flex-wrap gap-5'>
									<div className='flex flex-row gap-2 items-center'>
										<div
											className={`w-5 h-5 ${highContrast ? 'bg-[#E38627]' : 'bg-[#027857]'}`}
										></div>
										<p className='text-lg font-Varela'>Resto de Miembros</p>
									</div>
									<div className='flex flex-row gap-2 items-center'>
										<div className='w-5 h-5 bg-[#10b981]'></div>
										<p className='text-lg font-Varela'>Miembros Filtrados</p>
									</div>
								</div>
								<div className='flex flex-wrap gap-5 items-center'>
									<PieChart
										className='max-w-60 max-h-60'
										animate
										data={[
											{
												title: 'Miembros totales',
												value:
													families
														.map(family => family.members.length)
														.reduce((a, b) => a + b, 0) - contador.members,
												// Use different green-ish color
												color: highContrast ? '#E38627' : '#047857'
											},
											{
												title: 'Miembros filtrados',
												value: contador.members,
												color: '#10b981'
											}
										]}
										style={{
											fontFamily:
												'"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
											fontSize: '8px'
										}}
										lineWidth={60}
										segmentsStyle={{
											transition: 'stroke .3s',
											cursor: 'pointer'
										}}
										labelPosition={100 - 60 / 2}
										labelStyle={{
											fill: '#fff',
											opacity: 0.75,
											pointerEvents: 'none'
										}}
										label={({ dataEntry }) =>
											Math.round(dataEntry.percentage) + '%'
										}
									/>
									<div className='flex-1 flex-wrap gap-5'>
										<h3 className='text-xl font-Varela mb-3'>
											{families
												.map(family => family.members.length)
												.reduce((a, b) => a + b, 0)}{' '}
											Miembros en total
										</h3>
										<h3 className='text-xl font-Varela mb-3'>
											{contador.members} Miembros Filtrados
										</h3>
									</div>
								</div>
							</div>
						</>
					)}
					{contadorType === 'Food' && (
						<>
							<div className='flex flex-col gap-5'>
								<h3 className='text-xl font-Varela mb-3 font-bold'>
									Alimentos
								</h3>
								{/* Leyend */}
								<div className='flex flex-wrap gap-5'>
									<div className='flex flex-row gap-2 items-center'>
										<div className='w-5 h-5 bg-[#E38627]'></div>
										<p className='text-lg font-Varela'>Resto de Alimentos</p>
									</div>
									<div className='flex flex-row gap-2 items-center'>
										<div
											className={`w-5 h-5 ${highContrast ? 'bg-[#16A34A]' : 'bg-[#C13C37]'}`}
										></div>
										<p className='text-lg font-Varela'>Alimentos Filtrados</p>
									</div>
								</div>
								<div className='flex flex-wrap gap-5 items-center'>
									<PieChart
										className='max-w-60 max-h-60'
										animate
										data={[
											{
												title: 'Alimentos totales',
												value: foods.length - contador.foods,
												color: '#E38627'
											},
											{
												title: 'Alimentos filtrados',
												value: contador.foods,
												color: highContrast ? '#16A34A' : '#C13C37'
											}
										]}
										style={{
											fontFamily:
												'"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
											fontSize: '8px'
										}}
										lineWidth={60}
										segmentsStyle={{
											transition: 'stroke .3s',
											cursor: 'pointer'
										}}
										labelPosition={100 - 60 / 2}
										labelStyle={{
											fill: '#fff',
											opacity: 0.75,
											pointerEvents: 'none'
										}}
										label={({ dataEntry }) =>
											Math.round(dataEntry.percentage) + '%'
										}
									/>
									<div className='flex-1 flex-wrap gap-5'>
										<h3 className='text-xl font-Varela mb-3'>
											{foods.length} Alimentos en total
										</h3>
										<h3 className='text-xl font-Varela mb-3'>
											{contador.foods} Alimentos Filtrados
										</h3>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</section>
		</div>
	)
}
