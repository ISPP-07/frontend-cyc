/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import CardFood from '../../app/components/cardFood'

describe('CardFood', () => {
	test('renders Card component without crashing', () => {
		render(
			<CardFood
				food={{
					name: 'name 1',
					quantity: 25
				}}
			/>
		)
	})

	test('renders Card component with food data', () => {
		const foodData = {
			name: 'name 1',
			quantity: 25
		}
		render(<CardFood food={foodData} />)
	})

	test('test 2', () => {
		const foodData = [
			{
				id: 1,
				name: 'name 1',
				quantity: 25
			},
			{
				id: 2,
				name: 'name 2',
				quantity: 59
			},
			{
				id: 3,
				name: 'name 3',
				quantity: 32
			}
		]

		const { getByText } = render(
			<div>
				{foodData.map(food => (
					<CardFood key={food.id} food={food} />
				))}
			</div>
		)
		foodData.forEach(food => {
			expect(getByText(food.name)).toBeDefined()

			if (!food.is_call) {
				expect(null).toBeDefined()
			}
		})
	})
})
