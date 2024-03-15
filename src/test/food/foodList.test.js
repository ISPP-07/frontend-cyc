/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, screen, waitFor } from '@testing-library/react'
import { fetchDataFoods } from '../../app/food/fetchDataFoods.js'
import FoodPage from '../../app/food/page.jsx'
import { test, expect, describe, jest } from '@jest/globals'

jest.mock('../../app/food/fetchDataFoods.js')

describe('FoodList', () => {
	test('renders food cards', async () => {
		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]
		fetchDataFoods.mockResolvedValue(mockData)
		waitFor(async () => {
			render(<FoodPage />)
			const foodCards = await screen.findAllByRole('link')
			expect(foodCards).toHaveLength(mockData.length)
		})
	})
})
