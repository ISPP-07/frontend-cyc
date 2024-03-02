import Link from 'next/link'
import Modal from './modal.jsx'
import React from 'react'

export default function Page({ searchParams }) {
	const show = searchParams?.show

	return (
		<>
			<Link href="/families/?show=true">SUMMON THE MODAL</Link>

			{show && <Modal />}
		</>
	)
}
