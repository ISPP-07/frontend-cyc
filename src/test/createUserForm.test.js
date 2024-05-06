/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest, afterEach } from '@jest/globals'
import CreateUserForm, {
	validatePassword
} from '../app/components/CreateUserForm.jsx'
import axios from 'axios'

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}))

jest.mock('axios')

describe('CreateUserForm', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
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

		const result = validatePassword(formData)

		expect(result).toBe(true)
	})
	test('onSubmit', () => {
		axios.post = jest.fn().mockResolvedValueOnce({
			data: { username: 'testuser', email: 'test@example.com' }
		})
		const { getByTestId } = render(<CreateUserForm />)
		fireEvent.change(getByTestId('nombre'), { target: { value: 'testuser' } })
		fireEvent.change(getByTestId('email'), {
			target: { value: 'test@test.com' }
		})
		fireEvent.change(getByTestId('password-input'), {
			target: { value: 'password123' }
		})
		fireEvent.change(getByTestId('passwordConfirm-input'), {
			target: { value: 'password123' }
		})
		fireEvent.submit(getByTestId('create'))
	})

	test('differentPasswords', () => {
		axios.post = jest.fn().mockResolvedValueOnce({
			data: { status: 409, data: { detail: 'Bad Passwords' } }
		})
		const { getByTestId } = render(<CreateUserForm />)
		fireEvent.change(getByTestId('nombre'), { target: { value: 'testuser2' } })
		fireEvent.change(getByTestId('email'), {
			target: { value: 'test2@test.com' }
		})
		fireEvent.change(getByTestId('password-input'), {
			target: { value: 'password123' }
		})
		fireEvent.change(getByTestId('passwordConfirm-input'), {
			target: { value: 'password1234' }
		})
		fireEvent.submit(getByTestId('create'))
	})

	test('onSubmit', () => {
		axios.post = jest.fn().mockResolvedValueOnce({
			data: { username: 'testuser', email: 'test@example.com' }
		})
		const { getByTestId } = render(<CreateUserForm />)
		fireEvent.change(getByTestId('nombre'), {
			status: 409,
			data: { detail: 'Duplicate username or email' }
		})
		fireEvent.change(getByTestId('email'), {
			target: { value: 'test@test.com' }
		})
		fireEvent.change(getByTestId('password-input'), {
			target: { value: 'password123' }
		})
		fireEvent.change(getByTestId('passwordConfirm-input'), {
			target: { value: 'password123' }
		})
		fireEvent.submit(getByTestId('create'))
	})
})
