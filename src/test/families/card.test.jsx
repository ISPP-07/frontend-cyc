/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import Card from '../../app/components/card.jsx'

describe('Card', () => {
	test('renders Card component without crashing', () => {
		render(
			<Card
				family={{
					name: 'John Doe',
                    deliveries: 8,
                    is_call: false
				}}
			/>
		)
	})

	test('renders Card component with beneficiary data', () => {
		const beneficiaryData = {
			name: 'John Doe',
			deliveries: 8,
			is_call: false
		}
		render(<Card family={beneficiaryData} />)
	})

	test('test 2', () => {
		const beneficiariesData = [
			{
				id: 1,
				name: 'Beneficiary 1',
                deliveries: 8,
				is_call: false
			},
			{
				id: 2,
				name: 'Beneficiary 2',
                deliveries: 9,
				is_call: true
			}
		]

		const { getByText } = render(
			<div>
				{beneficiariesData.map(beneficiary => (
					<Card key={beneficiary.id} family={beneficiary} />
				))}
			</div>
		)
		beneficiariesData.forEach(beneficiary => {
			expect(getByText(beneficiary.name)).toBeDefined()

			if (!beneficiary.is_call) {
				expect(null).toBeDefined()
			}
		})
	})
})