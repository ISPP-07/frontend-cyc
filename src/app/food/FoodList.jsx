import { fetchDataFoods } from './fetch.jsx'
import Link from 'next/link.js'
import FoodCard from './FoodCard'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default async function FoodList() {
	const data = await fetchDataFoods()
	return (
		<div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{data.map(food => (
				<Link href={`/food/${food.id}`} key={food.id}>
					<FoodCard key={food.id} food={food} />
				</Link>
			))}
		</div>
	)
}
