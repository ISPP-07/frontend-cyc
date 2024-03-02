import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { fetchDataFoods } from '../../app/food/fetch.jsx'
import FoodList from '../../app/food/FoodList.jsx'
import { test, expect, describe, jest } from '@jest/globals'

jest.mock('../../app/food/fetch.jsx')

describe('FoodList', () => {
	test('renders food cards', async () => {
		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]
		fetchDataFoods.mockResolvedValue(mockData)
		waitFor(async () => {
			render(<FoodList />)
			const foodCards = await screen.findAllByRole('link')
			expect(foodCards).toHaveLength(mockData.length)
		})
	})
})
