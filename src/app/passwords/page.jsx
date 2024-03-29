'use client'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import qrImage from 'qr-image'
import axios from 'axios'
import Sidebar from '../components/sidebar.jsx'
import UpdatePasswordForm from '../components/UpdatePasswordForm.jsx'

export default function ChangePassword() {
	const [qrText, setQrText] = useState('')

	const getLocalAccessToken = () => {
		const jwt = localStorage.getItem('jwt')
		return jwt
	}
	const generateQRCode = text => {
		const qr = qrImage.imageSync(text, { type: 'png' })
		return `data:image/png;base64,${qr.toString('base64')}`
	}

	const handleQR = async () => {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		try {
			const token = getLocalAccessToken()
			const response = await axios.post(
				`${BASEURL}/shared/auth/recovery-qr-code`,
				null,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			setQrText(response.data.qr_code)
		} catch (error) {
			console.error(error)
			alert(
				'Ha habido un error generando el código QR. Por favor, inténtelo de nuevo.'
			)
		}
	}

	return (
		<main className="flex flex-col md:flex-row w-full h-screen">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="flex justify-center items-center w-full h-full md:w-1/2">
				<div className="w-full md:w-3/4 flex flex-col items-center">
					<div className="font-Varela text-center mb-4">
						<p>
							<strong>
								Si desea cambiar la contraseña de su cuenta, siga estos pasos:
							</strong>
						</p>
						<ol className="mb-4">
							<li>
								<strong>Paso 1:</strong> Haga clic en el botón &quot;Generar
								QR&quot; a continuación.
							</li>
							<li>
								<strong>Paso 2:</strong> Escanee el código QR con una aplicación
								de móvil, como Autenticator.
							</li>
							<li>
								<strong>Paso 3:</strong> Utilice el código proporcionado por la
								aplicación dentro del formulario que se encuentra a la derecha.
							</li>
						</ol>
						<p>
							Es importante tener en cuenta que si ya ha escaneado el código y
							lo ha registrado en una aplicación, no genere un nuevo QR. En caso
							de generar uno nuevo, deberá volver a escanearlo, ya que los
							códigos anteriores no serán válidos.
						</p>
						<p>
							El código generado por la aplicación le permitirá recuperar el
							acceso a su cuenta en caso de que olvide su contraseña.
						</p>
					</div>
					{qrText && (
						<img
							src={generateQRCode(qrText)}
							alt="QR Code"
							className="w-auto h-auto"
							data-testid="qr-code"
						/>
					)}
					<button
						onClick={handleQR}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-8"
						data-testid="generate-qr"
					>
						Generar QR
					</button>
				</div>
			</div>
			<div className="w-full md:w-1/2">
				<div className="w-full h-full flex items-center justify-center">
					<UpdatePasswordForm show={false} />
				</div>
			</div>
		</main>
	)
}
