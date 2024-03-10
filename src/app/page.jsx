import Image from 'next/image'
import LoginForm from './components/LoginForm'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
export default function Home() {
	return (
		<main className="flex flex-row items-center justify-around w-screen h-screen text-black">
			<Image
				src="/cycbackground.png"
				fill={true}
				style={{
					zIndex: -10,
					objectFit: 'cover',
					position: 'absolute',
					top: 0,
					left: 0
				}}
				quality={100}
			/>

			<Image
				src="/cyclogo.png"
				alt="Cirio Y Costal Logo"
				width={400}
				height={400}
			/>

			<LoginForm />
		</main>
	)
}
