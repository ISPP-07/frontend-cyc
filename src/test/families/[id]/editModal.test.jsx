/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { test, describe, jest, expect } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import Modal from '../../../app/families/[id]/editFamilyModal.jsx'
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}))
jest.mock('../../../app/families/[id]/fetchFamily.js', () => ({
	fetchFamily: jest.fn().mockResolvedValue({
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
	})
}))

describe('editModal', () => {
	jest.mock('axios')
	test('render family', async () => {
		render(<Modal id="1" />)
		await waitFor(() => expect(screen.getByTestId('name')).toBeDefined)
	})

	test('no members', async () => {
		render(<Modal id="1" />)
		await waitFor(() => expect(screen.getByTestId('name')).toBeDefined)
		const X = screen.getByTestId('removeMember')
		fireEvent.click(X)
		fireEvent.submit(screen.getByTestId('submit'))
	})
	test('no family head', async () => {
		render(<Modal id="1" />)
		await waitFor(() => expect(screen.getByTestId('name')).toBeDefined)
		fireEvent.change(screen.getByTestId('family_head'), {
			target: { value: false }
		})
		fireEvent.submit(screen.getByTestId('submit'))
	})
	test('bad phone', async () => {
		render(<Modal id="1" />)
		await waitFor(() => expect(screen.getByTestId('name')).toBeDefined)
		fireEvent.change(screen.getByTestId('phone'), {
			target: { value: 'holaquetal' }
		})
		fireEvent.submit(screen.getByTestId('submit'))
	})
	test('bad nid', async () => {
		render(<Modal id="1" />)
		await waitFor(() => expect(screen.getByTestId('name')).toBeDefined)
		fireEvent.change(screen.getByTestId('nid'), {
			target: { value: 'holaquetal' }
		})
		fireEvent.submit(screen.getByTestId('submit'))
		fireEvent.change(screen.getByTestId('nid'), {
			target: { value: '24523481K' }
		})
		fireEvent.submit(screen.getByTestId('submit'))
	})
})
