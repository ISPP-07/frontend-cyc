'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { useRouter } from 'next/navigation'
import removeHiddenClass from '../removeHiddenClass'
import addHiddenClass from '../addHiddenClass'

export function validatePassword(formData) {
	const password = formData.get('password').toString()
	const confirmPassword = formData.get('confirmPassword').toString()

	return password === confirmPassword
}

function CreateUserForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [userNameOrEmailError, setUserNameOrEmailError] = useState(false)
	const [validating, setValidating] = useState('')
	const [errors, setErrors] = useState({})

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	const verifyEmail = async email => {
		setValidating('Validating email...')
		try {
			const response = await axios.post('/api/verify_email', { email })
			setValidating('')
			return response.data.success
		} catch (error) {
			setValidating('')
			if (error.response.status !== 504) {
				return false
			} else {
				// Ask for confirmation if the request failed
				if (
					confirm(
						'Algo fallo intentando verificar el correo, ¿desea continuar de todas formas?'
					)
				)
					return true
				else return false
			}
		}
	}

	async function validateForm(formData) {
		let isValid = true
		const errors = {}

		if (!validatePassword(formData)) {
			isValid = false
			errors.password_conf = 'Las contraseñas no coinciden'
		}

		const email = formData.get('email').toString()
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

		if (!emailRegex.test(email)) {
			isValid = false
			errors.email = 'Estructura de correo electrónico inválida'
		}

		const emailValid = await verifyEmail(email)
		if (!emailValid) {
			isValid = false
			errors.email = 'Correo electrónico inválido'
		}

		const password = formData.get('password').toString()

		// Check password has at least 8 characters, one uppercase, one lowercase and one number without regex
		const hasUpperCase = /[A-Z]/.test(password)
		const hasLowerCase = /[a-z]/.test(password)
		const hasNumber = /\d/.test(password)
		const hasLength = password.length >= 8
		if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasLength) {
			isValid = false
			errors.password =
				'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
		}

		setErrors(errors)
		addHiddenClass()
		return isValid
	}

	const router = useRouter()

	async function onSubmit(event) {
		event.preventDefault()
		removeHiddenClass()
		const formData = new FormData(event.target)

		if (await validateForm(formData)) {
			formData.delete('confirmPassword')

			const jsonData = {
				username: formData.get('username').toString(),
				password: formData.get('password').toString(),
				email: formData.get('email').toString()
			}
			const isMaster = formData.get('master') === 'on'
			const endpoint = isMaster ? '/shared/user/master' : '/shared/user/'

			axios
				.post(
					process.env.NEXT_PUBLIC_BASE_URL + endpoint,
					JSON.stringify(jsonData),
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				.then(function (response) {
					alert(
						`El usuario ${response.data.username} con email ${response.data.email} ha sido creado correctamente`
					)
					router.push('/users')
				})
				.catch(function (error) {
					if (error.response.status === 409) setUserNameOrEmailError(true)
					else
						alert(
							`Ha habido un error al crear al usuario: ${error.response.data.detail}`
						)
				})
		}
	}
	return (
		<div className="flex flex-col bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300">
			<h1 className="mb-10 text-center font-poppins text-2xl">
				<strong>Crear Nuevo Usuario</strong>
			</h1>
			<form onSubmit={onSubmit} className="flex flex-col gap-3">
				<article className="flex flex-col">
					<span className="text-red-500">
						{userNameOrEmailError &&
							'Ya existe un usuario con ese correo o nombre de usuario'}
					</span>
					<label htmlFor="username">Usuario</label>
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
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							/>
						</svg>
						<input
							data-testid="nombre"
							type="text"
							id="username"
							name="username"
							placeholder="Usuario"
							className="p-1 pl-7 pr-7 w-full rounded-xl"
							required={true}
						/>
					</div>
				</article>
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
							required={true}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
							/>
						</svg>

						<input
							data-testid="email"
							type="text"
							id="email"
							name="email"
							placeholder="Correo electrónico"
							className="p-1 pl-7 pr-7 w-full rounded-xl"
						/>
					</div>
					{validating && <span>{validating}</span>}
					{errors.email && <span className="text-red-500">{errors.email}</span>}
				</article>
				<article className="flex flex-col">
					<label htmlFor="password">Contraseña</label>
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
							required={true}
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
					{errors.password && (
						<span className="text-red-500">{errors.password}</span>
					)}
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
							id="confirmPassword"
							name="confirmPassword"
							placeholder="Contraseña"
							className="p-1 pl-7 w-full rounded-xl"
							data-testid="passwordConfirm-input"
							required={true}
						/>
					</div>
				</article>
				{errors.password_conf && (
					<span className="text-red-500">{errors.password_conf}</span>
				)}
				<article className="flex flex-col">
					<fieldset className="flex flex-row w-full gap-1">
						<input
							className="flex items-center border-2 rounded-xl border-gray-200 bg-white"
							type="checkbox"
							id="master"
							name="master"
						/>
						<label htmlFor="master" className="text-black">
							Marcar como usuario maestro
						</label>
					</fieldset>
				</article>
				<div className="flex items-center justify-center gap-5 mt-5">
					<input
						data-testid="create"
						type="submit"
						value="Registrar"
						className="bg-green-500 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4"
					/>
				</div>
			</form>
		</div>
	)
}

export default CreateUserForm
