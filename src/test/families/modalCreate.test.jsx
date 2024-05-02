/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, describe, jest } from '@jest/globals'
import Modal from '../../app/families/modal.jsx'

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}))

describe('Modal component', () => {
	test('renders checkbox group correctly', () => {
		const { getByText } = render(<Modal />)

		const altaButton = getByText('Dar de Alta')

		fireEvent.click(altaButton)
	})

	test('no members', () => {
		const mockAlert = jest.fn()
		global.alert = mockAlert
		const { getByTestId } = render(<Modal />)
		const submit = getByTestId('form')
		const d = getByTestId('remove')
		fireEvent.click(d)
		fireEvent.submit(submit)
		global.alert = jest.fn()
	})
	test('no more than 1 family head', () => {
		const mockAlert = jest.fn()
		global.alert = mockAlert
		const { getByTestId, getAllByTestId } = render(<Modal />)
		const submit = getByTestId('form')
		const add = getByTestId('add-member')
		fireEvent.click(add)
		const d = getAllByTestId('family_head')
		fireEvent.submit(submit)
		fireEvent.click(d[0])
		fireEvent.click(d[1])
		fireEvent.submit(submit)
	})
	test('no family head', () => {
		const mockAlert = jest.fn()
		global.alert = mockAlert
		const { getByTestId } = render(<Modal />)
		const submit = getByTestId('form')
		fireEvent.submit(submit)
	})
	test('bad dni', () => {
		const { getByTestId } = render(<Modal />)
		const dni = getByTestId('dni')
		fireEvent.change(dni, { target: { value: 'thisisnotavaliddni' } })
		const submit = getByTestId('form')
		fireEvent.submit(submit)	
	})

	test('close', () => {
		const { getByTestId } = render(<Modal />)
		const close = getByTestId('close')
		fireEvent.click(close)
	})
})
