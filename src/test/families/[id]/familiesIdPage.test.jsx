/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render } from '@testing-library/react'
import { test, describe, jest, expect } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import FamiliesIdPage from '../../../app/families/[id]/page.jsx'
import { calculateAge } from '../../../app/families/[id]/page.jsx'
import axios from 'axios'

jest.mock('../../../app/families/[id]/fetchFamily')
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	}),
	useSearchParams: () => ({
		get: jest.fn()
	}),
	usePathname: () => ({
		get: jest.fn()
	}),
	useParams: jest.fn()
}))

jest.mock('../../../app/families/[id]/fetchDeliveryFamily')
jest.mock('axios')

describe('FamiliesIdPage', () => {
	test('should render specific text', async () => {
		const mockedFamily = {
			id: 1,
			name: 'Test Family',
			phone: '123456789',
			address: 'Test Address',
			derecognition_state: 'Active',
			members: [
				{
					name: 'John',
					surname: 'Doe',
					nationality: 'US',
					nid: '12345',
					date_birth: '1990-01-01',
					gender: 'Man',
					functional_diversity: false,
					homeless: false,
					family_head: true
				}
			]
		}

		// Mock delivery data
		const mockedDelivery = [
			{
				id: 1,
				state: 'delivered',
				date: '2024-05-02',
				lines: [
					{ quantity: 1, name: 'Product 1' },
					{ quantity: 2, name: 'Product 2' }
				]
			}
		]

		// Mock fetchFamily function
		axios.get = jest.fn().mockResolvedValueOnce({ data: mockedFamily })

		// Mock fetchDeliveryFamily function
		axios.get = jest.fn().mockResolvedValueOnce({ data: mockedDelivery })
		render(<FamiliesIdPage />)
	})
	test('should calculate age', () => {
		const date = '1990-01-01'
		const age = calculateAge(date)
		expect(age).toBe(34)
	})
})
