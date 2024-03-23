/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { fetchFamily } from '../../../app/families/[id]/fetchFamily'
import { render, waitFor } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import FamiliesIdPage from '../../../app/families/[id]/page'

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
		const data = [{ id: '123', name: 'Family 1' }]
		fetchFamily.mockResolvedValue(data)
		waitFor(async () => {
			render(<FamiliesIdPage />)
			expect(fetchFamily).toHaveBeenCalled()
		})
	})
})
