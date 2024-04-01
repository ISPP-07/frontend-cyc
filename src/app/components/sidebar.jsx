'use client'
import Image from 'next/image'
import Link from 'next/link'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import SidebarEntry from './sidebarEntry'

export default function Sidebar() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const isMobile = () => {
		return typeof window !== 'undefined' ? window.innerWidth <= 768 : false
	}

	const initialState = isMobile() ? 'false' : 'true'

	const links = [
		{
			link: `/families?showSidebar=${initialState}`,
			icon: '/family.svg',
			text: 'Familias'
		},
		{
			link: `/families/derecognised?showSidebar=${initialState}`,
			icon: '/no-family.svg',
			text: 'Familias de baja',
			subentry: true
		},
		{
			link: `/food?showSidebar=${initialState}`,
			icon: '/box.svg',
			text: 'Inventario'
		},
		{
			link: `/food/warehouse`,
			icon: '/square-plus.svg',
			text: 'Almacenes',
			subentry: true
		},
		{
			link: '/deliveries',
			icon: '/truck.svg',
			text: 'Entregas'
		},
		{
			link: '/deliveries?showModal=true',
			icon: '/square-plus.svg',
			text: 'Añadir entregas',
			subentry: true
		},
		{
			link: '',
			icon: '/bell.svg',
			text: 'Notificaciones'
		},
		{
			link: '/passwords',
			icon: '/bell.svg',
			text: 'Cambiar contraseña'
		},
		{
			link: `/users?showSidebar=${initialState}`,
			icon: '/face.svg',
			text: 'Usuarios'
		},
		{
			link: `/create-user?showSidebar=${initialState}`,
			icon: '/face-plus.svg',
			text: 'Crear nuevo usuario',
			subentry: true
		}
	]

	const state = searchParams?.get('showSidebar') === 'true'

	const toggleShowSidebar = () => {
		const params = new URLSearchParams(searchParams)
		params.set('showSidebar', (!state).toString())
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div
			className={`${state ? 'min-w-[300px] w-[300px] max-w-[300px] fixed sm:sticky' : 'max-w-0 min-w-0 w-0 sm:min-w-[30px] sm:w-[30px] sm:max-w-[30px] sticky'} top-0 left-0 border border-solid h-screen shadow-xl z-20 bg-white transition-all duration-50`}
		>
			<button
				className={`${state ? 'left-[280px]' : 'left-[10px]'} absolute cursor-pointer border rounded-full border-gray-300 w-[40px] h-[40px] top-5 bg-blue-400 hover:bg-blue-600 flex items-center justify-center transition-all duration-50`}
				onClick={toggleShowSidebar}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-3/4 h-3/4 text-white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d={`${state ? 'M15.75 19.5 8.25 12l7.5-7.5' : 'm8.25 4.5 7.5 7.5-7.5 7.5'}`}
					/>
				</svg>
			</button>
			<div
				className={`${state ? '' : 'hidden'} flex items-center justify-center gap-6 py-4`}
			>
				<Image src="/cyc.png" width={100} height={100}></Image>
				<div className="flex flex-col items-center justify-center text-3xl font-bolds text-black font-Varela">
					<p>Cirio</p>
					<p>y Costal</p>
				</div>
			</div>
			<div className="flex flex-col justify-between">
				<div className={`${state ? '' : 'hidden'} flex flex-col my-3`}>
					{links.map((link, index) => (
						<SidebarEntry
							key={index}
							link={link.link}
							icon={link.icon}
							text={link.text}
							subentry={link.subentry}
							pathname={pathname}
						/>
					))}
				</div>
				<div
					className={`${state ? '' : 'hidden'} absolute bottom-0 w-[300px] left-[30px]`}
				>
					<hr className="w-4/5"></hr>
					<Link
						href="/"
						className="flex items-center justify-center text-sm font-normal font-Varela text-white rounded-xl bg-red-500 hover:bg-red-700 shadow-xl p-2 w-3/4 my-9 gap-2"
					>
						<Image src="/logout.svg" width={18} height={18}></Image>
						<span>Cerrar Sesión</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
