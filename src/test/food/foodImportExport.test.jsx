/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios' // Mock axios
import { fetchDataFoods } from '../../app/food/fetchDataFoods.js'
import { test, expect, describe, jest } from '@jest/globals'
import FoodPage from '../../app/food/page.jsx'
import exportFromJSON from 'export-from-json'

jest.mock('axios')
jest.mock('../../app/food/fetchDataFoods.js')
jest.mock('export-from-json')
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	}),
	useSearchParams: () => ({
		get: jest.fn()
	}),
	usePathname: () => ({
		get: jest.fn()
	})
}))

describe('FoodList', () => {
	test('export button', async () => {
		render(<FoodPage />)

		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]

		fetchDataFoods.mockResolvedValue(mockData)

		const exportButton = screen.getByTestId('ex')
		fireEvent.click(exportButton)

		expect(exportFromJSON).toHaveBeenCalledTimes(1)
	})

	test('import button', async () => {
		render(<FoodPage />)

		const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {})

		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]

		// Mocking fetchDataFoods function
		fetchDataFoods.mockResolvedValue(mockData)

		const fileInput = screen.queryByTestId('file')

		// Generate a file to upload
		const file = new File(['test.xls'], 'test.xls', {
			type: 'application/vnd.ms-excel'
		})

		// Simulate file upload
		await waitFor(() => {
			fireEvent.change(fileInput, {
				target: { files: [file] }
			})
		})

		// Ensure axios.post is called with correct argumentsj
		expect(axios.post).toHaveBeenCalledWith(
			'url/de/import',
			expect.any(FormData),
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		)

		expect(alertSpy).toHaveBeenCalledWith('Datos importados correctamente')

		// Simulate error during import
		axios.post.mockRejectedValueOnce(new Error('Some error'))

		await fireEvent.change(fileInput, {
			target: { files: [new File(['test.xls'], 'test.xls')] }
		})

		expect(alertSpy).toHaveBeenCalledWith('Error al importar los datos')
		alertSpy.mockRestore()
	})
})
