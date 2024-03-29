'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import ButtonIcon from './buttonIcon'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function UserDetails({ user }) {
	const [toggleUser, setToggleUser] = useState(false)
	const [togglePassword, setTogglePassword] = useState(false)

	const router = useRouter()
	function deleteUser() {
		const confirmed = window.confirm(
			'¿Desea eliminar los datos de este usuario?'
		)
		if (confirmed) {
			const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
			try {
				axios.delete(`${BASEURL}/shared/user/${user.id}`)
				router.push('/users')
			} catch (error) {
				return null
			}
		}
	}

	function editView() {
		setToggleUser(!toggleUser)
	}

	function changePassword() {
		setTogglePassword(!togglePassword)
	}

	async function onSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.target)

		const jsonData = {
			username: formData.get('username').toString(),
			email: formData.get('email').toString()
		}

		if (togglePassword) {
			jsonData.password = formData.get('password').toString()
		}
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

		axios
			.patch(`${BASEURL}/shared/user/${user.id}`, JSON.stringify(jsonData), {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(function (response) {
				alert(
					`El usuario ${response.data.username} con email ${response.data.email} ha sido actualizado correctamente`
				)
				router.push(`/users`)
			})
			.catch(function (error) {
				alert(
					`Ha habido un error al crear al actualizar al usuario: ${error.response.data.detail}`
				)
			})
	}

	return (
		<div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300 w-[45	0px]">
			<div
				className="flex gap-3 justify-end items-center w-full"
				data-testid="user-data"
			>
				<ButtonIcon
					iconpath="/edit.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-blue-500'}
					handleClick={editView}
				/>
				<ButtonIcon
					iconpath="/trash.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-red-500'}
					handleClick={deleteUser}
				/>
			</div>
			<div className="flex gap-2 items-center justify-center w-full">
				<Image src="/face.svg" width={40} height={40} alt="Icono de usuario" />
				<h1 className="text-center font-poppins text-2xl">
					{!toggleUser ? (
						<strong>Detalles del usuario</strong>
					) : (
						<strong>Editar usuario</strong>
					)}
				</h1>
			</div>
			<hr></hr>
			{user &&
				(toggleUser ? (
					<form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
						<article className="flex items-center w-full">
							<label
								htmlFor="username"
								className="font-Varela w-fit text-blue-500 font-bold mr-2"
							>
								Nombre de usuario:
							</label>
							<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
								<input
									data-testid="nombre"
									type="text"
									id="username"
									name="username"
									placeholder="Nombre de usuario"
									defaultValue={user.username}
									className="p-1 w-full rounded-xl bg-white placeholder-black"
								/>
							</div>
						</article>
						<article className="flex items-center w-full">
							<label
								htmlFor="email"
								className="font-Varela w-fit text-blue-500 font-bold mr-2"
							>
								Correo electrónico:
							</label>
							<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
								<input
									type="text"
									id="email"
									name="email"
									defaultValue={user.email}
									placeholder="Correo electrónico"
									className="p-1 w-full rounded-xl bg-white placeholder-black"
								/>
							</div>
						</article>
						<article className="flex items-center w-full">
							<label
								htmlFor="changePassword"
								className="font-Varela w-fit text-blue-500 font-bold mr-2"
							>
								¿Desea cambiar la contraseña?
							</label>
							<div className="flex items-center w-full  rounded-xl border-gray-200 bg-white">
								<input
									data-testid="changePassword"
									type="checkbox"
									value={togglePassword}
									checked={togglePassword}
									onChange={changePassword}
								/>
							</div>
						</article>

						{togglePassword && (
							<article className="flex items-center w-full">
								<label
									htmlFor="password"
									className="font-Varela w-fit text-blue-500 font-bold mr-2"
								>
									Nueva contraseña:
								</label>
								<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
									<input
										type="password"
										id="password"
										name="password"
										className="p-1 w-full rounded-xl bg-white placeholder-black"
									/>
								</div>
							</article>
						)}

						<div className="flex items-center w-full justify-center gap-5 mt-5">
							<input
								type="submit"
								value="Confirmar cambios"
								className="bg-green-500 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4"
							/>
						</div>
					</form>
				) : (
					<section className="flex flex-col gap-3 w-full">
						<article className="flex items-center w-full">
							<p className="font-Varela text-blue-500 font-bold mr-2">
								Nombre de usuario:
							</p>
							<p className="p-1">{user.username}</p>
						</article>
						<article className="flex items-center w-full">
							<p className="font-Varela text-blue-500 font-bold mr-2">
								Correo electrónico:
							</p>
							<p className="p-1">{user.email}</p>
						</article>
					</section>
				))}
		</div>
	)
}
