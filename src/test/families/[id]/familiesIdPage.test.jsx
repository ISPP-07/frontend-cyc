/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'
import { fetchFamily } from '../../../app/families/[id]/fetchFamily'
import { render, waitFor } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import FamiliesIdPage from '../../../app/families/[id]/page'

describe('FamiliesIdPage', () => {
	test('should render specific text', () => {
		waitFor(async () => {
			const { getByText } = render(<FamiliesIdPage />)
			expect(getByText('Edades:')).toBeInTheDocument()
			expect(getByText('Nº de personas:')).toBeInTheDocument()
			expect(getByText('Nacionalidad:')).toBeInTheDocument()
			expect(getByText('Hermandad:')).toBeInTheDocument()
			expect(getByText('Próxima renovación:')).toBeInTheDocument()
			expect(getByText('Observaciones:')).toBeInTheDocument()
		})
	})
	test('fetches data from the API and returns it', async () => {
		const data = [
			{ id: '1', name: 'Family 1' },
			{ id: '2', name: 'Family 2' }
		]

		axios.get = jest.fn().mockResolvedValue({ data })

		const result = await fetchFamily()

		expect(result).toEqual(data)
		expect(axios.get).toHaveBeenCalledWith(
			'https://65df0d8eff5e305f32a14ed5.mockapi.io/api/v1/cyc/family'
		)
	})
})
