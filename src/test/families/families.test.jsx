/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, waitFor, screen } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import BeneficiariesList from '../../app/families/page.jsx'
import { fetchFamily } from '../../app/families/fetchFamilies.js'

jest.mock('../../app/families/fetchFamilies.js')

describe('BeneficiariesList', () => {
	test('Renderizar', async () => {
		const datos = [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' }
		]

		fetchFamily.mockResolvedValue(datos)

		const data = await fetchFamily()

		expect(data).toEqual(datos)

		waitFor(() => {
			render(<BeneficiariesList />)
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Jane Doe')).toBeInTheDocument()
		})
	})
})
