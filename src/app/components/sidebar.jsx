'use client'
import Image from 'next/image'
import Link from 'next/link'
import './components.css'
import React from 'react'

export default function Sidebar() {
	return (
		<div className="absolute h-screen rounded-md border border-solid w-[300px] shadow-xl z-20">
			<div className="absolute h-32 bg-white rounded-none w-[299px] ">
				<Image
					src="/cyc.png"
					className="absolute rounded-none top-[21px] left-[27px]"
					width={100}
					height={100}
				></Image>
				<p className="absolute text-3xl font-bolds top-[21px] left-[171px] right-[20px] text-black font-Varela">
					Cirio y Costal
				</p>
			</div>
			<div className="absolute top-[138px] w-[300px] flex flex-col leading-6 opacity-100 gap-[12px]">
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/family.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/families"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Familias
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/square-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/families?show=true"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Dar de alta
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/no-family.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link3"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Familias de baja
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/box.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/food"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Inventario
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/square-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link5"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Añadir elemento
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/truck.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>

					<Link
						href="/link6"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Entregas
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/square-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link7"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Añadir entregas
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/bell.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/link8"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Notificaciones
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/face.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/link9"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Usuarios
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/face-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link10"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Crear nuevo ususario
					</Link>
				</div>
				<hr className="mt-[30px] w-3/4 mx-auto"></hr>
				<button className="absolute w-48 h-8 flex items-center justify-center text-sm font-normal leading-5 top-[450px] left-[45px] font-Varela text-white rounded-3xl bg-red-500 shadow-xl">
					<Image
						src="/logout.svg"
						width={18}
						height={18}
						className="mr-1"
					></Image>
					<span>Cerrar Sesión</span>
				</button>
			</div>
		</div>
	)
}
