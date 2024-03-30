/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import DeliveriesList from '../../app/deliveries/page'
import { fetchFamilies } from '../../app/families/fetchFamilies.js'
import axios from 'axios'
import { fetchDataFoods } from '../../app/food/fetchDataFoods'

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
describe('DeliveriesList', () => {
	jest.mock('axios')
	jest.mock('../../app/families/fetchFamilies.js')
	jest.mock('../../app/food/fetchDataFoods.js')

	test('render deliveries', async () => {
		const mockData = [
			{
				id: '271985e1-c590-40f7-ae1d-a50a3e7b5fd6',
				date: '2024-04-05T00:00:00',
				months: 2,
				state: 'next',
				lines: [
					{
						product_id: '9a116d2b-7a9c-46e5-a0cd-23b959bbd34e',
						quantity: 1,
						state: 's',
						name: 'Arroz'
					}
				],
				family_id: '1'
			},
			{
				id: 'e0a687e0-ea94-4ade-bfe6-0832396ac056',
				date: '2024-04-06T00:00:00',
				months: 1,
				state: 'delivered',
				lines: [
					{
						product_id: '9a116d2b-7a9c-46e5-a0cd-23b959bbd34e',
						quantity: 2,
						state: 'd',
						name: 'string'
					}
				],
				family_id: '2'
			}
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = [
			{ id: 1, name: 'Family 1' },
			{ id: 2, name: 'Family 2' }
		]

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		render(<DeliveriesList />)
		const elements = await screen.findAllByTestId('delivery-data')
		expect(elements).toHaveLength(mockData.length)
		expect(await screen.queryByText('Family 1')).toBeDefined()
		expect(await screen.queryByText('Family 2')).toBeDefined()

		const delivery1 = elements[0]
		expect(delivery1.getElementsByTagName('select')[0].value).toBe('next')

		fireEvent.click(delivery1.getElementsByTagName('button')[0])
		expect(await screen.queryByText('1 Arroz')).toBeDefined()
	})
	test('error rendering', async () => {
		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockRejectedValue(null)

		render(<DeliveriesList />)
		const elements = screen.queryAllByTestId('delivery-data')
		expect(elements).toHaveLength(0)
	})

	test('delete warehouse', async () => {
		const mockData = [
			{
				id: '271985e1-c590-40f7-ae1d-a50a3e7b5fd6',
				date: '2024-04-05T00:00:00',
				months: 2,
				state: 'next',
				lines: [
					{
						product_id: '9a116d2b-7a9c-46e5-a0cd-23b959bbd34e',
						quantity: 1,
						state: 's',
						name: 'Arroz'
					}
				],
				family_id: '1'
			}
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = [{ id: 1, name: 'Family 1' }]

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))

		const axiosDeleteSpy = jest.spyOn(axios, 'delete')
		axiosDeleteSpy.mockResolvedValue()

		render(<DeliveriesList />)

		const elements = await screen.findAllByTestId('delivery-data')
		const delivery1 = elements[0]
		fireEvent.click(delivery1.getElementsByTagName('button')[0])
		const deleteButton = await screen.findByTestId('delete-update-buttons')

		fireEvent.click(deleteButton.getElementsByTagName('button')[1])
		expect(axiosDeleteSpy).toHaveBeenCalled()
	})

	test('update status', async () => {
		const mockData = [
			{
				id: '271985e1-c590-40f7-ae1d-a50a3e7b5fd6',
				date: '2024-04-05T00:00:00',
				months: 2,
				state: 'next',
				lines: [
					{
						product_id: '9a116d2b-7a9c-46e5-a0cd-23b959bbd34e',
						quantity: 1,
						state: 's',
						name: 'Arroz'
					}
				],
				family_id: '1'
			}
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = [{ id: 1, name: 'Family 1' }]

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		const axiosPatchSpy = jest.spyOn(axios, 'patch')
		axiosPatchSpy.mockResolvedValue()

		render(<DeliveriesList />)

		const elements = await screen.findAllByTestId('delivery-data')
		const delivery1 = elements[0]
		const statusSelect = delivery1.getElementsByTagName('select')[0]
		expect(statusSelect.value).toBe('next')
		fireEvent.change(statusSelect, { target: { value: 'delivered' } })

		expect(axiosPatchSpy).toHaveBeenCalled()
		expect(statusSelect.value).toBe('delivered')
	})

	test('create delivery modal', async () => {
		const mockData = [
			{
				id: '271985e1-c590-40f7-ae1d-a50a3e7b5fd6',
				date: '2024-04-05T00:00:00',
				months: 2,
				state: 'next',
				lines: [
					{
						product_id: '9a116d2b-7a9c-46e5-a0cd-23b959bbd34e',
						quantity: 1,
						state: 's',
						name: 'Arroz'
					}
				],
				family_id: '1'
			}
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = [{ id: 1, name: 'Family 1' }]

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		const mockProducts = [{ id: 1, name: 'arroz', quantity: 10 }]

		const productsSpy = jest.spyOn({ fetchDataFoods }, 'fetchDataFoods')
		productsSpy.mockResolvedValue(mockProducts)

		const axiosPostSpy = jest.spyOn(axios, 'patch')
		axiosPostSpy.mockResolvedValue()

		render(<DeliveriesList />)

		const showButton = await screen.findByText('Añadir entrega')
		fireEvent.click(showButton)

		const familySelect = (
			await screen.findByTestId('familySelect')
		).getElementsByTagName('input')[1]

		fireEvent.change(familySelect, { target: { value: 1 } })

		const datePicker = await screen.findByTestId('datePicker')
		fireEvent.change(datePicker, { target: { value: '2024-04-05' } })

		const monthInput = await screen.findByTestId('monthInput')
		fireEvent.change(monthInput, { target: { value: 1 } })

		const stateSelect = (
			await screen.findByTestId('stateSelect')
		).getElementsByTagName('input')[0]
		fireEvent.change(stateSelect, { target: { value: 'next' } })

		const productSelect = (
			await screen.findByTestId('productSelect')
		).getElementsByTagName('input')[1]
		fireEvent.change(productSelect, { target: { value: 1 } })

		const quantityInput = await screen.findByTestId('quantityInput')
		fireEvent.change(quantityInput, { target: { value: 1 } })

		const productStateInput = await screen.findByTestId('productStateInput')
		fireEvent.change(productStateInput, { target: { value: 'good' } })

		const addProductButton = await screen.findByTestId('add-product')
		expect(screen.queryAllByTestId('remove-product')).toHaveLength(0)
		fireEvent.click(addProductButton)
		expect(screen.queryAllByTestId('remove-product')).toHaveLength(1)
		const removeProductButton = await screen.findByTestId('remove-product')
		fireEvent.click(removeProductButton)
		expect(screen.queryAllByTestId('remove-product')).toHaveLength(0)
		const createButton = await screen.findByTestId('create-update-button')
		fireEvent.click(createButton)

		expect(axiosPostSpy).toHaveBeenCalled()
	})
})
