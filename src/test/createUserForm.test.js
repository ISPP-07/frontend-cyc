/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import CreateUserForm, {
	validatePasswords
} from '../app/components/CreateUserForm.jsx'

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}))

describe('CreateUserForm', () => {
	test('Create form renders', () => {
		const { getByText } = render(<CreateUserForm />)
		expect(getByText('Usuario')).toBeDefined()
		expect(getByText('Contraseña')).toBeDefined()
		expect(getByText('Confirmar contraseña:')).toBeDefined()
	})
	test('Password input is hidden by default', () => {
		const { getByTestId } = render(<CreateUserForm />)
		const passwordInput = getByTestId('password-input')
		expect(passwordInput.type).toBe('password')
	})
	test('Toggle Password', () => {
		const { getByTestId } = render(<CreateUserForm />)
		const toggleButton = getByTestId('toggle-button')
		const passwordInput = getByTestId('password-input')
		expect(passwordInput.type).toBe('password')
		fireEvent.click(toggleButton)
		expect(passwordInput.type).toBe('text')
		fireEvent.click(toggleButton)
		expect(passwordInput.type).toBe('password')
	})

	test('validate password', () => {
		const formData = new FormData()
		formData.append('password', 'password123')
		formData.append('confirmPassword', 'password123')

		const result = validatePasswords(formData)

		expect(result).toBe(true)
	})
})
