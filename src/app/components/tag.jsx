/* eslint-disable  no-unused-vars */
import React from 'react'
/* eslint-enable  no-unused-vars */
import Image from 'next/image'

export default function Tag({
	pathsvg,
	svgWidth = 14,
	svgHeight = 14,
	text,
	color,
	textColor,
	isOnlyIcon = false
}) {
	return (
		<div
			className={`text-xs w-fit inline-flex ${isOnlyIcon ? 'p-2' : 'gap-2 px-3 p-2'} items-center leading-sm rounded-full
				${color}`}
		>
			<span>
				<Image src={pathsvg} width={svgWidth} height={svgHeight} />
			</span>
			<span className={`${textColor}`}>{text}</span>
		</div>
	)
}
