import './globals.css'
import React from 'react'

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body>{children}</body>
		</html>
	)
}
