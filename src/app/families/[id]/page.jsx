import Link from 'next/link.js'
import ButtonText from '../../components/buttonText.jsx'
import ButtonIcon from '@/app/components/buttonIcon.jsx'
import { fetchFamily } from './fetchFamily'
import Image from 'next/image'

import React, { Suspense } from 'react'
import Sidebar from '@/app/components/sidebar.jsx'
export default async function FamiliesIdPage() {
	const data = await fetchFamily()
	const familyList = data.filter(familia => familia.id === '2')
	const familyFirstInList = familyList[0]
	/* Althoug the familiList filter returns an array with only one element, 
    we need to access the first element of the array to get the object with the family data
    because filter always returns an array, even if it has only one element */

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex">
				<div className="flex flex-col gap-4 h-screen w-[500px] bg-white border border-solid shadow-xl p-5 px-8">
					<div className="flex items-center gap-4">
						<Image
							alt="imagen-familia"
							src="/family-2.svg"
							width={50}
							height={50}
						></Image>
						<div className="flex items-center justify-between w-full">
							<span className="font-Varela text-black text-2xl font-bold">
								{familyFirstInList.name}
							</span>
							<div className="flex items-center gap-2">
								<ButtonIcon
									iconpath="/edit.svg"
									iconHeight={18}
									iconWidth={18}
									border={'border border-blue-500'}
								/>
								<Link href="/families">
									<ButtonIcon
										iconpath="/cross.svg"
										iconHeight={18}
										iconWidth={18}
										color={'bg-yellow-500'}
									/>
								</Link>
							</div>
						</div>
					</div>
					<div>
						<ButtonText
							text="+ Nuevo reparto"
							color="bg-green-700"
							isRounded="true"
							px="3"
							className="shadow-2xl font-Varela text-sm text-white"
						/>
					</div>
					<hr></hr>
					<div className="flex items-center gap-3">
						<Image
							alt="imagen-telefono"
							src="/phone.svg"
							width={20}
							height={20}
						></Image>
						<p className="font-Varela text-gray-800 text-base">
							{familyFirstInList.address}
						</p>
					</div>
					<div className="flex items-center gap-3">
						<Image
							alt="imagen-dirección"
							src="/address.svg"
							width={20}
							height={20}
						></Image>
						<p className="font-Varela text-gray-800 text-base">
							{familyFirstInList.phone}
						</p>
					</div>
					<hr></hr>
					<div className="flex flex-col gap-3">
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Edades:
							</span>
							16
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Nº de personas:
							</span>
							{familyFirstInList.number_of_people}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Nacionalidad:
							</span>
							española
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Hermandad o asociación:
							</span>
							{familyFirstInList.referred_organization}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Próxima renovación:
							</span>
							{familyFirstInList.next_renewal_date}{' '}
						</p>
						<p className="font-Varela text-gray-800">
							<p className="font-Varela text-blue-500 font-bold">
								Observaciones:
							</p>
							<p className="font-Varela text-gray-800 mt-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
								fugiat repudiandae numquam expedita aliquid nostrum distinctio
								error eveniet ad rem quo, veritatis commodi harum doloribus!
								Vero exercitationem porro asperiores sequi!
							</p>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
