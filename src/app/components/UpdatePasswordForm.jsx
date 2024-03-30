'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordForm({ onToggle, show = true }) {
	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	const router = useRouter()

	async function onSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.target)

		const jsonData = {
			email: formData.get('email').toString(),
			opt_code: formData.get('opt_code').toString(),
			new_password: formData.get('password').toString()
		}
		axios
			.post(
				process.env.NEXT_PUBLIC_BASE_URL +
					`/shared/user/change-password?email=${jsonData.email}&otp_code=${jsonData.opt_code}&new_password=${jsonData.new_password}`,
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then(function (response) {
				alert(`Se ha modificado la contraseña correctamente`)
				router.push('/families')
			})
			.catch(function (error) {
				alert(`Hubo un error al modificar la contraseña: ${error.JSON}`)
			})
	}
	return (
		<div className="flex flex-col bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300">
			<h1 className="mb-10 text-center font-poppins text-2xl">
				<strong>Cambiar contraseña</strong>
			</h1>
			<form onSubmit={onSubmit} className="flex flex-col gap-3">
				<article className="flex flex-col">
					<label htmlFor="email">Correo electrónico</label>
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
								d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
							/>
						</svg>

						<input
							type="text"
							id="email"
							name="email"
							placeholder="Correo electrónico"
							className="p-1 pl-7 pr-7 w-full rounded-xl"
							data-testid="email-input"
						/>
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="opt_code">Código de autenticación</label>
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
							type="text"
							id="opt_code"
							name="opt_code"
							placeholder="Código de autenticación"
							className="p-1 pl-7 pr-7 w-full rounded-xl"
							data-testid="otp-input"
						/>
					</div>
				</article>
				<article className="flex flex-col">
					<label htmlFor="password">Nueva contraseña</label>
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
				<div className="flex items-center justify-center gap-5 mt-5">
					<input
						type="submit"
						value="Confirmar"
						className="bg-green-500 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4"
						data-testid="change-password-button"
					/>
				</div>
				{show && (
					<button
						className="text-blue-500 mt-1 hover:text-blue-700 font-Varela py-2 px-4 rounded"
						onClick={onToggle}
					>
						Regresar al inicio de sesión
					</button>
				)}
			</form>
		</div>
	)
}
