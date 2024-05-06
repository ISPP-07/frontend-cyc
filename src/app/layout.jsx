import './globals.css'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Loader from './components/loader'

export const metadata = {
	title: 'Cirio y Costal',
	description: 'Cirio y Costal',
	manifest: '/manifest.json',
	viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
}

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<head>
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body>
				<Loader />
				{children}
			</body>
		</html>
	)
}
