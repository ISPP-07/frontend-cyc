'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import LoginForm from './components/LoginForm'
import UpdatePasswordForm from './components/UpdatePasswordForm'
export default function Home() {
	const [forgotPassword, setForgotPassword] = useState(false)

	const handleDonationClick = () => {
		const URL = process.env.NEXT_PUBLIC_STRIPE_BASE_URL
		window.location.href = URL
	}

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
			<div className="flex flex-col items-center justify-center">
				{/* Cirio Y Costal Logo Image */}
				<Image
					src="/cyclogo.png"
					alt="Cirio Y Costal Logo"
					width={400}
					height={400}
					className="w-1/2 sm:w-[300px] md:w-[300px] lg:w-[400px]"
				/>

				{/* Div with White Background for Text and Button */}
				<div className="mt-6 p-4 bg-white shadow-md rounded-lg text-center">
					{/* Encouraging Message for Donations */}
					<p className="text-lg font-semibold text-black">
						Ayúdanos a llevar alimentos a las mesas que más lo necesitan. Tu
						donación hace la diferencia.
					</p>

					{/* Centered Donation Button */}
					<button
						onClick={handleDonationClick}
						className="mt-4 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block"
					>
						Donar €
					</button>
				</div>
			</div>

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
