/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function Page() {
	return (
		<main className="main">
			<div>
				<h1>Oops, parece que no hay conexión a internet</h1>
				<h1>Conéctese y pruebe de nuevo</h1>
				<h1>
					Pulse{' '}
					<a className="text-blue-700 underline" href="/families">
						aquí
					</a>{' '}
					una vez que tenga conexión y espere
				</h1>
			</div>
		</main>
	)
}
