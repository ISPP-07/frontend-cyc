import Searchbar from '../components/searchbar'
import ButtonText from '../components/buttonText'
import ButtonIcon from '../components/buttonIcon'
import CardFamily from '../components/cardFamily'
import Tag from '../components/tag'
import React from 'react'

export default function Page() {
	const handleClick = ''
	const family = {
		name: 'Familia Pérez',
		deliveries: [
			{ id: 1, date: '2022-01-01' },
			{ id: 2, date: '2022-01-02' }
		],
		is_call: true
	}
	return (
		<div className="flex flex-col">
			<Searchbar />
			<div className="w-full flex justify-center gap-3 mb-10">
				<ButtonText
					text={'Dar de alta'}
					handleClick={handleClick}
					px={3}
					isRounded={true}
					color={'bg-[#75AF73]'}
				/>
				<ButtonIcon
					iconpath={'/plus.svg'}
					handleClick={handleClick}
					color={'bg-[#75AF73]'}
				/>
				<Tag
					pathsvg={'/truck.svg'}
					text={family.deliveries.length}
					color={'bg-blue-200'}
					textColor={'text-gray-400'}
				/>
			</div>
			<div className="flex justify-center w-full">
				<div className="m-3 w-full flex flex-wrap gap-3 justify-start items-center">
					<CardFamily family={family} />
					<CardFamily family={family} />
					<CardFamily family={family} />
					<CardFamily family={family} isJustifyEndTag />
					<CardFamily family={family} />
					<CardFamily family={family} />
					<CardFamily family={family} />
				</div>
			</div>
		</div>
	)
}
