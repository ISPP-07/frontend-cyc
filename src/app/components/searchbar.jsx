'use client'
import Image from 'next/image'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import ButtonIcon from './buttonIcon'
import ButtonText from './buttonText'

const Searchbar = ({
	text = 'Dar de alta',
	page = '',
	handleClick = () => {
		console.log('Funciona')
	},
	handleSearch = () => {},
	startDate,
	endDate,
	handleStartDateChange,
	handleEndDateChange,
	handleFilterView,
	deliveryStates,
	handleDeliveryStateChange
}) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [expandedRow, setExpandedRow] = useState(false)

	const handleChange = event => {
		setSearchTerm(event.target.value)
		handleSearch(event.target.value)
	}

	const handleFilter = () => {
		if (expandedRow) setExpandedRow(false)
		else setExpandedRow(true)
	}
	return (
		<div className="flex w-full justify-end pt-3 self-start sticky top-0 left-0 bg-white">
			<div className="flex justify-around items-center md:w-full w-5/6 p-3 gap-1">
				<div className="flex w-10/12 border-solid border-[1px] border-gray-400 rounded-full p-1 focus-within:border-black">
					<button className="outline-none focus:outline-none pl-1">
						<Image src="/magnifier.svg" width={18} height={18} />
					</button>
					<input
						type="search"
						placeholder="Buscar..."
						className="w-full pl-2 bg-transparent outline-none"
						value={searchTerm}
						onChange={handleChange}
					/>
				</div>
				{(page === 'food' || page === 'family') && (
					<ButtonIcon
						color={'bg-red-500'}
						iconpath={'/expired.svg'}
						handleClick={handleFilterView}
					/>
				)}
				{(page === 'food' || page === 'delivery') && (
					<ButtonIcon
						color={'bg-blue-500'}
						iconpath={'/filter.svg'}
						handleClick={handleFilter}
					/>
				)}

				{expandedRow && (
					<>
						<div className="p-2">
							<label htmlFor="startDate">Desde:</label>
							<input
								className="ml-2 border border-blue-400 rounded-md p-1"
								type="date"
								id="startDate"
								name="startDate"
								value={startDate || ''}
								onChange={handleStartDateChange}
							/>
						</div>
						<div className="p-2">
							<label htmlFor="endDate">Hasta:</label>
							<input
								className="ml-2 border border-blue-400 rounded-md p-1"
								type="date"
								id="endDate"
								name="endDate"
								value={endDate || ''}
								onChange={handleEndDateChange}
							/>
						</div>
						{page === 'delivery' && (
							<div className="p-2">
								<label htmlFor="deliveryState">Estado:</label>
								<select
									id="deliveryState"
									className="w-full border border-gray-300 rounded-md p-1 mt-1"
									onChange={handleDeliveryStateChange}
								>
									<option value="">Seleccione...</option>
									{deliveryStates.map(state => (
										<option key={state.id} value={state.value}>
											{state.label}
										</option>
									))}
								</select>
							</div>
						)}
						{page === 'food' && (
							<div className="p-2">
								<label htmlFor="deliveryState">Almacén:</label>
								<select
									id="deliveryState"
									className="w-full border border-gray-300 rounded-md p-1 mt-1"
									onChange={handleDeliveryStateChange}
								>
									<option value="">Seleccione...</option>
									{deliveryStates.map(warehouse => (
										<option key={warehouse.id} value={warehouse.value}>
											{warehouse.label}
										</option>
									))}
								</select>
							</div>
						)}
					</>
				)}
				<div className="lg:hidden block">
					<ButtonIcon
						color={'bg-[#75AF73]'}
						iconpath={'/plus.svg'}
						handleClick={handleClick}
					/>
				</div>
				<div className="lg:block hidden">
					<ButtonText
						text={text}
						px={'md:px-3'}
						isRounded={true}
						color={'bg-[#75AF73]'}
						handleClick={handleClick}
					/>
				</div>
			</div>
		</div>
	)
}
export default Searchbar
