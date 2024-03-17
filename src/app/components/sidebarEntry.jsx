import Link from 'next/link'
import Image from 'next/image'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function SidebarEntry({
	link,
	icon,
	text,
	subentry = false,
	pathname
}) {
	return (
		<Link
			href={link}
			className={`${subentry === true ? 'pl-10' : ''} flex items-center justify-start text-xl cursor-pointer sidebar-menu-item px-3 py-2 gap-3 hover:text-blue-500`}
		>
			<Image src={icon} width={18} height={18}></Image>
			<span
				className={`${pathname === link ? 'text-blue-500' : ''} font-Varela text-base`}
			>
				{text}
			</span>
		</Link>
	)
}
