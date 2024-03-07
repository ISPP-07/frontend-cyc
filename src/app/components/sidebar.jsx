'use client'
import Image from 'next/image'
import Link from 'next/link'
import './components.css'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Sidebar() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	let state = searchParams?.get('showSidebar') === 'true'

	const toggleShowSidebar = () => {
		const params = new URLSearchParams(searchParams)
		params.set('showSidebar', (!state).toString())
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div
			className={`${state ? 'min-w-[300px] w-[300px] max-w-[300px]' : 'min-w-[30px] w-[30px] max-w-[30px] sm:w-screen'} sticky top-0 left-0 border border-solid h-screen shadow-xl z-20 bg-white`}
		>
			<button
				className={`${state ? 'left-[280px]' : 'left-[10px]'} absolute cursor-pointer border rounded-full border-gray-300 w-[40px] h-[40px] top-5 bg-blue-400 flex items-center justify-center`}
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
					<Link href="/families" className="">
						<div className="w-[30px] h-full"></div>
						<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 py-2 gap-3">
							<Image src="/family.svg" width={18} height={18}></Image>
							<span className="font-Varela text-base">Familias</span>
						</div>
					</Link>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 gap-3 py-2 pl-10">
						<Image src="/square-plus.svg" width={18} height={18}></Image>
						<Link href="/families?show=true" className="font-Varela text-base">
							Dar de alta
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 gap-3 py-2 pl-10">
						<Image src="/no-family.svg" width={18} height={18}></Image>
						<Link href="" className="font-Varela text-base">
							Familias de baja
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 py-2 gap-3">
						<Image src="/box.svg" width={18} height={18}></Image>
						<Link href="/food" className="font-Varela text-base">
							Inventario
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 gap-3 py-2 pl-10">
						<Image src="/square-plus.svg" width={18} height={18}></Image>
						<Link href="" className="font-Varela text-base">
							Añadir elemento
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 py-2 gap-3">
						<Image src="/truck.svg" width={18} height={18}></Image>

						<Link href="" className="font-Varela text-base">
							Entregas
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 gap-3 py-2 pl-10">
						<Image src="/square-plus.svg" width={18} height={18}></Image>
						<Link href="" className="font-Varela text-base">
							Añadir entregas
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 py-2 gap-3">
						<Image src="/bell.svg" width={18} height={18}></Image>
						<Link href="" className="font-Varela text-base">
							Notificaciones
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 py-2 gap-3">
						<Image src="/face.svg" width={18} height={18}></Image>
						<Link href="" className="font-Varela text-base">
							Usuarios
						</Link>
					</div>
					<div className="flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 gap-3 py-2 pl-10">
						<Image src="/face-plus.svg" width={18} height={18}></Image>
						<Link href="/create-user" className="font-Varela text-base">
							Crear nuevo ususario
						</Link>
					</div>
				</div>
				<div
					className={`${state ? '' : 'hidden'} absolute bottom-0 w-[300px] left-[30px]`}
				>
					<hr className="w-4/5"></hr>
					<Link
						href="/"
						className="flex items-center justify-center text-sm font-normal font-Varela text-white rounded-xl bg-red-500 shadow-xl p-2 w-3/4 my-9 gap-2"
					>
						<Image src="/logout.svg" width={18} height={18}></Image>
						<span>Cerrar Sesión</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
