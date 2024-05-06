/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { render, fireEvent, waitFor } from '@testing-library/react'
import DeliveriesForm from '../../app/components/DeliveriesForm'

jest.mock('axios')
jest.mock('../../app/food/fetchDataFoods')
jest.mock('../../app/families/fetchFamilies')

describe('DeliveriesFOrm', () => {
	test('renders form with families and products', async () => {
		const { getByTestId } = render(<DeliveriesForm />)

		// Wait for data fetching
		await waitFor(() => expect(getByTestId('familySelect')).toBeDefined)
		await waitFor(() => expect(getByTestId('productSelect')).toBeDefined)
	})

	test('updates formData on input change', async () => {
		const { getByTestId } = render(<DeliveriesForm />)

		const input = getByTestId('datePicker')
		expect(input.value).toBe('')
		fireEvent.change(input, { target: { value: '2022-05-20' } })
		expect(input.value).toBe('2022-05-20')
		const input2 = getByTestId('quantityInput')
		fireEvent.change(input2, { target: { value: '20' } })
		expect(input2.value).toBe('20')
		const input3 = getByTestId('productStateInput')
		fireEvent.change(input3, { target: { value: 'Prueba' } })
		expect(input3.value).toBe('Prueba')
	})
	test('handleAddProduct', async () => {
		const { getByTestId, getAllByTestId } = render(<DeliveriesForm />)

		const button = getByTestId('add-product')
		fireEvent.click(button)
		const button2 = getAllByTestId('quantityInput')
		expect(button).toBeDefined()
		expect(button2).toBeDefined()
		const button3 = getByTestId('remove-product')
		expect(button3).toBeDefined()
		fireEvent.click(button3)
	})

	test('badMonths', async () => {
		const { getByTestId } = render(<DeliveriesForm />)

		const input = getByTestId('monthInput')
		fireEvent.change(input, { target: { value: '0' } })
		fireEvent.submit(getByTestId('create-update-button'))
	})
})
