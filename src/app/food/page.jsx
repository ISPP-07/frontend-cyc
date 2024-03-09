'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link'
import CardFood from '../components/cardFood'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import { fetchDataFoods } from './fetch'

export default function FoodPage() {
	// const data = await fetchDataFoods()
	const [stateModal, setStateModal] = useState(false)

	const toggleModal = () => {
		setStateModal(!stateModal)
	}
	return (
		<main className="flex w-full">
			<Sidebar />
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar text="Añadir elemento" handleClick={toggleModal} />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{/* {data.map(food => (
						<Link href={`/food/${food.id}`} key={food.id}>
							<CardFood key={food.id} food={food} />
						</Link>
					))} */}
				</div>
			</div>
			{stateModal ? <AddElementForm onClickFunction={toggleModal} /> : null}
		</main>
	)
}
