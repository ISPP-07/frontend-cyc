import Link from 'next/link.js'

import Card from '../components/card.jsx'

import { fetchFamily } from './fetchFamilies.js'

export default async function BeneficiariesList() {
	const data = await fetchFamily()

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{data.map(family => (
				<Link href={`/families/${family.id}`} key={family.id}>
					<Card key={family.id} family={family} />
				</Link>
			))}
		</div>
	)
}
