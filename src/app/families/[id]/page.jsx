'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import ButtonText from '../../components/buttonText'
import ButtonIcon from '../../components/buttonIcon'
import { fetchFamily } from './fetchFamily'
import Image from 'next/image'
import Sidebar from '../../components/sidebar'
export default function FamiliesIdPage({params}) {

	const [family, setFamily] = useState(null)

	useEffect(() => {
        const fetchData = async () => {
            try {
				const family = await fetchFamily(params.id)
				setFamily(family)
			} catch (error) {
				console.error('Error al cargar los datos:', error);
				alert('Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.');
			}
        };
        fetchData();
    }, []);

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			{family && (
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
								{family.name}
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
							{family.address}
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
							{family.phone}
						</p>
					</div>
					<hr></hr>
					<div className="flex flex-col gap-3">
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Edades:
							</span>
							{family.ages}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Nº de personas:
							</span>
							{family.number_of_people}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Nacionalidad:
							</span>
							{family.national}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Hermandad o asociación:
							</span>
							{family.referred_organization}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Próxima renovación:
							</span>
							{family.next_renewal_date}{' '}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold">
								Observaciones:
							</span>
							<span className="font-Varela text-gray-800 mt-2">
								{family.observations}
							</span>
						</p>
					</div>
				</div>
			</div>
			)}
		</main>
	)
}
