/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import ChangePassword from '../../app/passwords/page'

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
describe('ChangePassword', () => {
	jest.mock('axios')

	test('render qr', async () => {
		const mockData = { qr_code: 'https://github.com' }

		jest.spyOn(Storage.prototype, 'getItem')
		Storage.prototype.getItem = jest.fn(() => 'mockJWT')

		const axiosSpy = jest.spyOn(axios, 'post')
		axiosSpy.mockResolvedValue({ data: mockData })

		render(<ChangePassword />)
		const generateQRButton = await screen.findByTestId('generate-qr')
		fireEvent.click(generateQRButton)
		const qrCode = await screen.findByTestId('qr-code')
		expect(axiosSpy).toHaveBeenCalled()
		expect(qrCode).toBeDefined()
	})
	test('render qr error', async () => {
		jest.spyOn(Storage.prototype, 'getItem')
		Storage.prototype.getItem = jest.fn(() => 'mockJWT')

		const axiosSpy = jest.spyOn(axios, 'post')
		axiosSpy.mockRejectedValue({ response: { code: 500 } })

		render(<ChangePassword />)
		const generateQRButton = await screen.findByTestId('generate-qr')
		fireEvent.click(generateQRButton)
		const qrCode = screen.queryByTestId('qr-code')
		expect(axiosSpy).toHaveBeenCalled()
		expect(qrCode).toBeNull()
	})

	test('update password', async () => {
		const axiosSpy = jest.spyOn(axios, 'post')
		axiosSpy.mockResolvedValue({ response: { code: 200 } })

		render(<ChangePassword />)
		const changePasswordButton = await screen.findByTestId(
			'change-password-button'
		)

		const emailInput = await screen.findByTestId('email-input')
		const otpInput = await screen.findByTestId('otp-input')
		const passwordInput = await screen.findByTestId('password-input')
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		fireEvent.change(otpInput, { target: { value: '012345' } })
		fireEvent.change(passwordInput, { target: { value: 'testPassword' } })
		fireEvent.click(changePasswordButton)
		expect(axiosSpy).toHaveBeenCalled()
	})
})
