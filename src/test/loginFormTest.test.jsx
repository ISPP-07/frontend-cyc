/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import LoginForm from '../app/components/LoginForm.jsx'

describe('LoginForm', () => {
	test('Login form renders', () => {
		const { getByText, getByLabelText } = render(<LoginForm />)

		expect(getByText('Usuario:')).toBeDefined()
		expect(getByText('Contraseña:')).toBeDefined()
		expect(getByLabelText('Usuario:')).toBeDefined()
		expect(getByLabelText('Contraseña:')).toBeDefined()
	})
	test('Password input is hidden by default', () => {
		const { getByLabelText } = render(<LoginForm />)
		const passwordInput = getByLabelText('Contraseña:')
		expect(passwordInput.type).toBe('password')
	})
	test('Toggle Password', () => {
		const { getByTestId } = render(<LoginForm />)
		const toggleButton = getByTestId('toggle-button')
		const passwordInput = getByTestId('password-input')

		expect(passwordInput.type).toBe('password')
		fireEvent.click(toggleButton)

		expect(passwordInput.type).toBe('text')
		fireEvent.click(toggleButton)

		expect(passwordInput.type).toBe('password')
	})
})
