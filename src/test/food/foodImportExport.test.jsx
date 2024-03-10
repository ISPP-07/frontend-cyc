/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios' // Mock axios
import FoodList from '../../app/food/FoodList.jsx'
import { fetchDataFoods } from '../../app/food/fetch.jsx'
import { exportData } from '../../app/exportData.js'
import { test, expect, describe, jest } from '@jest/globals'

// Mocking axios post function
jest.mock('axios')
jest.mock('../../app/food/fetch.jsx')

describe('FoodList', () => {
	test('export button', () => {
		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]
		fetchDataFoods.mockResolvedValue(mockData)

		waitFor(async () => {
			const { getByTestId } = render(<FoodList />)

			const exportButton = getByTestId('export-button')
			fireEvent.click(exportButton)

			// Ensure exportData is called with correct arguments
			expect(exportData).toHaveBeenCalledWith(mockData, 'Comidass')
		})
	})

	test('import button', async () => {
		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]

		// Mocking fetchDataFoods function
		fetchDataFoods.mockResolvedValue(mockData)

		waitFor(async () => {
			render(<FoodList />)

			fireEvent.click(screen.getByLabelText('Importar datos'))

			// Ensure axios.post is called with correct arguments
			expect(axios.post).toHaveBeenCalledWith(
				'url/de/import',
				expect.any(FormData),
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			)

			// Simulate error during import
			axios.post.mockRejectedValueOnce(new Error('Some error'))

			fireEvent.change(screen.getByLabelText('file'), {
				target: { files: [new File(['test.xls'], 'test.xls')] }
			})

			await screen.findByText('Error al importar los datos')
		})
	})
})
