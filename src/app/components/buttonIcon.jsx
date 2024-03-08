/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'

export default function ButtonIcon({
	iconpath,
	iconWidth = 18,
	iconHeight = 18,
	handleClick,
	color
}) {
	return (
		<button
			className={`${color} rounded-full text-white p-2 shadow-lg`}
			onClick={handleClick}
		>
			<Image src={iconpath} width={iconWidth} height={iconHeight} />
		</button>
	)
}
