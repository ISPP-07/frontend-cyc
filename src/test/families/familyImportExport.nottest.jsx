/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios' // Mock axios
import BeneficiariesList from '../../app/families/page.jsx'
import { fetchFamilies } from '../../app/families/fetchFamilies.js'
import { test, expect, describe, jest } from '@jest/globals'
import { exportData } from '../../app/exportData.js'

// Mocking axios post function
jest.mock('axios')
jest.mock('../../app/families/fetchFamilies.js')

describe('FamilyList', () => {
	test('export button', async () => {
		const mockData = [
			{ id: 1, name: 'family 1' },
			{ id: 2, name: 'family 2' }
		]
		// Mocking fetchDataFoods function
		fetchFamilies.mockResolvedValue(mockData)

		waitFor(async () => {
			const mockProps = { searchParams: null }
			const { getByTestId } = render(<BeneficiariesList {...mockProps} />)

			const exportButton = getByTestId('export-button')
			fireEvent.click(exportButton)

			// Ensure exportData is called with correct arguments
			expect(exportData).toHaveBeenCalledWith(mockData, 'Comidass')
		})
	})

	test('import button', async () => {
		const mockData = [
			{ id: 1, name: 'family 1' },
			{ id: 2, name: 'family 2' }
		]
		// Mocking fetchDataFoods function
		fetchFamilies.mockResolvedValue(mockData)

		waitFor(async () => {
			render(<BeneficiariesList />)

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
