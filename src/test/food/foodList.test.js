import React from 'react'
import { render, screen } from '@testing-library/react'
import { fetchDataFoods } from './fetchDataFoods'
import FoodList from '../../app/food/FoodList.jsx'

jest.mock('./fetchDataFoods')

describe('FoodList', () => {
	test('renders food cards', async () => {
		const mockData = [
			{ id: 1, name: 'Food 1', quantity: 13 },

			{ id: 2, name: 'Food 2', quantity: 53 }
		]
		fetchDataFoods.mockResolvedValue(mockData)

		render(<FoodList />)

		const foodCards = await screen.findAllByRole('link', { name: /food/i })
		expect(foodCards).toHaveLength(mockData.length)
	})

	test('renders error message when data fetching fails', async () => {
		const errorMessage = 'Failed to fetch data'
		fetchDataFoods.mockRejectedValue(new Error(errorMessage))

		render(<FoodList />)

		const errorMessageElement = await screen.findByText(errorMessage)
		expect(errorMessageElement).toBeInTheDocument()
	})
})
