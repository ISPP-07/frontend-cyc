import Link from 'next/link.js'
import Sidebar from '../../components/sidebar.jsx'
import { fetchFamily } from './fetchFamily'
import Image from 'next/image'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default async function FamiliesIdPage({params}) {
	const family = await fetchFamily(params.id)

	return (
		<main className="absolute flex bg-white w-full h-full">
			<Sidebar />
			<div className="h-full absolute w-2/6 bg-white-700 ml-[300px] border border-solid shadow-xl">
				<div className="h-28 relative flex justify-start">
					<Image
						alt="imagen-familia"
						src="/family-2.svg"
						width={50}
						height={50}
						className="ml-12"
					></Image>
					<p className="font-Varela mt-12 ml-4 text-black text-2xl w-32 font-bold">
						{' '}
						{family.name}{' '}
					</p>
					<div className=" h-28 w-52 flex flex-row items-center justify-end">
						<button className=" border border-blue-500  h-8 w-8 rounded-full shadow-2xl mt-3 mr-4">
							<Image
								alt="edit"
								src="/edit.svg"
								width={25}
								height={25}
								className="ml-1"
							></Image>
						</button>
						<button className=" bg-yellow-500 h-8 mt-3 w-8 rounded-full shadow-2xl">
							<Link href="/families">X</Link>
						</button>
					</div>
				</div>
				<div className="h-8 relative flex justify-start">
					<button className=" bg-green-700 rounded-xl w-32 ml-10 shadow-2xl font-Varela text-sm text-white">
						+ Nuevo reparto
					</button>
				</div>
				<div className="h-20 relative w-96">
					<hr className="mt-4 w-full ml-10 border-t border-dotted bg-gray-300"></hr>
					<div className="w-96 h-8 justify-start flex flex-row">
						<Image
							alt="imagen-telefono"
							src="/phone.svg"
							width={20}
							height={20}
							className="mt-2 ml-12"
						></Image>
						<p className="font-Varela text-gray-800 text-base ml-2 mt-1.5">
							{' '}
							{family.phone}
						</p>
					</div>
					<div className="w-96 h-8 justify-start flex flex-row">
						<Image
							alt="imagen-dirección"
							src="/address.svg"
							width={20}
							height={20}
							className="mt-2 ml-12"
						></Image>
						<p className="font-Var  ela text-gray-800 text-base ml-2 mt-1.5">
							{' '}
							{family.address}
						</p>
					</div>
					<hr className="mt-3 w-full ml-10 border-t border-dotted bg-gray-300"></hr>
				</div>
				<div className="h-96 w-full flex flex-col absolute">
					<div className="w-full h-6 flex flex-row mt-3">
						<p className="font-Varela text-blue-500 ml-12 text-base font-bold">
							{' '}
							Edades:{' '}
						</p>
						<p className="font-Varela text-gray-800 ml-2 text-base"> 16 </p>
					</div>
					<div className="w-full h-6 flex flex-row mt-3">
						<p className="font-Varela text-blue-500 ml-12 text-base font-bold">
							{' '}
							Nº de personas:{' '}
						</p>
						<p className="font-Varela text-gray-800 ml-2 text-base">
							{' '}
							{family.number_of_people}{' '}
						</p>
					</div>
					<div className="w-full h-6 flex flex-row mt-3">
						<p className="font-Varela text-blue-500 ml-12 text-base font-bold">
							{' '}
							Nacionalidad:{' '}
						</p>
						<p className="font-Varela text-gray-800 ml-2 text-base">
							{' '}
							{family.number_of_people}{' '}
						</p>
					</div>
					<div className="w-full h-6 flex flex-row mt-3">
						<p className="font-Varela text-blue-500 ml-12 text-base font-bold">
							{' '}
							Hermandad{' '}
						</p>
						<p className="font-Varela text-gray-800 ml-2 text-base">
							{' '}
							{family.referred_organization}{' '}
						</p>
					</div>
					<div className="w-full h-6 flex flex-row mt-3">
						<p className="font-Varela text-blue-500 ml-12 text-base font-bold">
							{' '}
							Próxima renovación:{' '}
						</p>
						<p className="font-Varela text-gray-800 ml-2 text-base">
							{' '}
							{family.next_renewal_date}{' '}
						</p>
					</div>
					<div className="w-full h-full flex flex-col mt-3">
						<p className="font-Varela text-blue-500 ml-12 text-base font-bold">
							{' '}
							Observaciones:{' '}
						</p>
						<p className="font-Varela text-gray-800 ml-12 text-base ml text-justify mr-12   ">
							{' '}
							{family.observations}{' '}
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
