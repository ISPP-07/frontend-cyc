'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import LoginForm from './components/LoginForm'
import UpdatePasswordForm from './components/UpdatePasswordForm'
export default function Home() {
	const [forgotPassword, setForgotPassword] = useState(false)

	const toggleForgotPassword = () => {
		setForgotPassword(!forgotPassword)
	}
	return (
		<main className="flex flex-col md:flex-row items-center justify-around w-screen h-screen text-black">
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
				className="w-1/2 sm:w-[300px] md:w-[300px] lg:w-[400px]"
			/>
			<div className="flex flex-col items-center">
				{forgotPassword ? (
					<UpdatePasswordForm onToggle={() => toggleForgotPassword(false)} />
				) : (
					<LoginForm onToggle={() => toggleForgotPassword(true)} />
				)}
			</div>
		</main>
	)
}
