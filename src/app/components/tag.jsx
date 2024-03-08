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
	textColor
}) {
	return (
		<div
			className={
				'text-xs w-fit inline-flex gap-2 items-center leading-sm px-3 p-1 rounded-full ' +
				color
			}
		>
			<span>
				<Image src={pathsvg} width={svgWidth} height={svgHeight} />
			</span>
			<span className={`${textColor}`}>{text}</span>
		</div>
	)
}
