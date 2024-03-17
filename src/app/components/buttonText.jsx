/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function ButtonText({
	text,
	handleClick,
	px,
	color,
	isRounded,
	moreStyles
}) {
	return (
		<button
			className={`${color} px-${px} ${isRounded ? 'rounded-full' : 'rounded-xl'} text-white text-sm p-2 shadow-lg ${moreStyles}`}
			onClick={handleClick}
		>
			{text}
		</button>
	)
}
