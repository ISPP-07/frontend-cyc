'use client'
/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from 'react'
import qrImage from 'qr-image'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import Sidebar from '../components/sidebar.jsx'
import UpdatePasswordForm from '../components/UpdatePasswordForm.jsx'

export default function WarehouseList() {
	const [qrText, setQrText] = useState(
		'otpauth://totp/Harmony:user2%40example.com?secret=OUPI4XGFVMMPPA6UTFEQIXL3O2MVOFTB&issuer=Harmony'
	)

	const getLocalAccessToken = () => {
		const jwt = JSON.parse(localStorage.getItem('jwt'))
		return jwt.access_token
	}
	const generateQRCode = text => {
		const qr = qrImage.imageSync(text, { type: 'png' })
		return `data:image/png;base64,${qr.toString('base64')}`
	}

	const handleQR = () => {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		try {
			const token = getLocalAccessToken()
			const response = axios.post(`${BASEURL}/shared/auth/recovery-qr-code`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			setQrText(response.data.qr_code)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		handleQR()
	}, [])

	return (
		<main className="flex w-full h-screen">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="flex justify-center items-center w-full h-full">
				<div className="flex justify-center items-center w-1/2">
					<img
						src={generateQRCode(qrText)}
						alt="QR Code"
						className="w-3/4 h-auto"
					/>
				</div>
				<div className="w-1/2">
					<div className="w-full h-full flex items-center justify-center">
						<UpdatePasswordForm />
					</div>
				</div>
			</div>
		</main>
	)
}
