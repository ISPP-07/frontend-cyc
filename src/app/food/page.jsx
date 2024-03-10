'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import CardFood from '../components/cardFood'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import AddElementForm from '../components/AddElementForm'

export default function FoodPage() {
	const data = [
		{
			name: 'name 1',
			quantity: 24,
			id: '1'
		},
		{
			name: 'name 2',
			quantity: 59,
			id: '2'
		},
		{
			name: 'name 3',
			quantity: 28,
			id: '3'
		},
		{
			name: 'name 4',
			quantity: 32,
			id: '4'
		},
		{
			name: 'name 5',
			quantity: 59,
			id: '5'
		},
		{
			name: 'name 6',
			quantity: 96,
			id: '6'
		},
		{
			name: 'name 7',
			quantity: 46,
			id: '7'
		},
		{
			name: 'name 8',
			quantity: 70,
			id: '8'
		},
		{
			name: 'name 9',
			quantity: 53,
			id: '9'
		},
		{
			name: 'name 10',
			quantity: 99,
			id: '10'
		},
		{
			name: 'name 11',
			quantity: 97,
			id: '11'
		},
		{
			name: 'name 12',
			quantity: 51,
			id: '12'
		},
		{
			name: 'name 13',
			quantity: 89,
			id: '13'
		},
		{
			name: 'name 14',
			quantity: 2,
			id: '14'
		},
		{
			name: 'name 15',
			quantity: 95,
			id: '15'
		},
		{
			name: 'name 16',
			quantity: 75,
			id: '16'
		},
		{
			name: 'name 17',
			quantity: 9,
			id: '17'
		},
		{
			name: 'name 18',
			quantity: 98,
			id: '18'
		},
		{
			name: 'name 19',
			quantity: 94,
			id: '19'
		},
		{
			name: 'name 20',
			quantity: 51,
			id: '20'
		},
		{
			name: 'name 21',
			quantity: 50,
			id: '21'
		},
		{
			name: 'name 22',
			quantity: 99,
			id: '22'
		},
		{
			name: 'name 23',
			quantity: 56,
			id: '23'
		},
		{
			name: 'name 24',
			quantity: 36,
			id: '24'
		},
		{
			name: 'name 25',
			quantity: 43,
			id: '25'
		},
		{
			name: 'name 26',
			quantity: 48,
			id: '26'
		},
		{
			name: 'name 27',
			quantity: 42,
			id: '27'
		},
		{
			name: 'name 28',
			quantity: 63,
			id: '28'
		},
		{
			name: 'name 29',
			quantity: 67,
			id: '29'
		},
		{
			name: 'name 30',
			quantity: 77,
			id: '30'
		},
		{
			name: 'name 31',
			quantity: 95,
			id: '31'
		},
		{
			name: 'name 32',
			quantity: 64,
			id: '32'
		},
		{
			name: 'name 33',
			quantity: 100,
			id: '33'
		},
		{
			name: 'name 34',
			quantity: 46,
			id: '34'
		}
	]
	const [stateModal, setStateModal] = useState(false)

	const toggleModal = () => {
		setStateModal(!stateModal)
	}
	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar text="Añadir elemento" handleClick={toggleModal} />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{data.map(food => (
						<CardFood key={food.id} food={food} handleClick={toggleModal} />
					))}
				</div>
			</div>
			{stateModal ? <AddElementForm onClickFunction={toggleModal} /> : null}
		</main>
	)
}
