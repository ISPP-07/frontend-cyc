'use client'
import { fetchDataFoods } from './fetch.jsx'
import Link from 'next/link.js'
import FoodCard from './FoodCard'
/* eslint-disable no-unused-vars */
import React from 'react'
import Image from 'next/image.js'
import exportData from '../exportData.js'
/* eslint-enable no-unused-vars */

export default async function FoodList() {
	const data = await fetchDataFoods()
	return (
	<div className="">
	<div className="h-12 w-12 top-28 absolute" >
				<button className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2" onClick={()=>exportData(data,'Comidass')}>
					<Image
						src="/excel.svg"
						className="ml-2"
						width={15}
						height={15}>	
					</Image>
				</button>
			</div>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{data.map(food => (
					<FoodCard key={food.id} food={food} />
			))}
		</div>
		</div>

	)
}
