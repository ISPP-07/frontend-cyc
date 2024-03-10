'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link'
import ButtonText from './buttonText'
function CreateUserForm() {
	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}
	return (
		<div className="flex flex-col bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300">
			<h1 className="mb-10 text-center font-poppins text-2xl">
				<strong>Crear Nuevo Usuario</strong>
			</h1>
			<div className="flex flex-col gap-3">
				<article className="flex flex-col">
					<label htmlFor="username">Usuario</label>
					<div className="flex items-center border-2 rounded-xl border-gray-200 bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-4 h-4 left-11 m-1 absolute"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							/>
						</svg>
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Usuario"
							className="p-1 pl-7 w-full rounded-xl"
						/>
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="password">Contraseña:</label>
					<div className="flex items-center border-2 rounded-xl border-gray-200 bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="absolute left-11 w-4 h-4 m-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							placeholder="Contraseña"
							className="p-1 pl-7 pr-7 w-full rounded-xl"
							data-testid="password-input"
						/>
						{showPassword ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="absolute right-11 w-4 h-4 m-1 cursor-pointer bg-white"
								onClick={togglePassword}
								data-testid="toggle-button"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="absolute right-11 w-4 h-4 m-1 cursor-pointer"
								onClick={togglePassword}
								data-testid="toggle-button"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						)}
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="confirm-password">Confirmar contraseña:</label>
					<div className="flex items-center border-2 rounded-xl border-gray-200 bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="absolute left-11 w-4 h-4 m-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
						<input
							type="password"
							id="confirm-password"
							name="confirm-password"
							placeholder="Contraseña"
							className="p-1 pl-7 w-full rounded-xl"
							data-testid="password-input"
						/>
					</div>
				</article>
				<div className="flex items-center justify-center gap-5 mt-5">
					<Link href="create-user" className=" w-full text-center">
						<ButtonText
							text="Registrar"
							color="bg-green-500"
							moreStyles={'w-3/4 hover:bg-green-700 hover:cursor-pointer'}
						/>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CreateUserForm
