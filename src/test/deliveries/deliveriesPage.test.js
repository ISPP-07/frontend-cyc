/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DeliveriesList from '../../app/deliveries/page'
import { fetchFamilies } from '../../app/families/fetchFamilies.js'
import axios from 'axios'

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
		const mockData = {
			elements: [
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
			],
			num_elements: 2
		}

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = {
			elements: [
				{ id: 1, name: 'Family 1' },
				{ id: 2, name: 'Family 2' }
			]
		}

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		render(<DeliveriesList />)
		const elements = await screen.findAllByTestId('delivery-data')
		expect(elements).toHaveLength(mockData.elements.length)
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
		const mockData = {
			elements: [
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
			],
			num_elements: 1
		}

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = { elements: [{ id: 1, name: 'Family 1' }] }

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

	test('handleDeliveryStateChange', async () => {
		const mockData = {
			elements: [
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
			],
			num_elements: 1
		}

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = { elements: [{ id: 1, name: 'Family 1' }] }

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))

		const axiosDeleteSpy = jest.spyOn(axios, 'delete')
		axiosDeleteSpy.mockResolvedValue()

		render(<DeliveriesList />)
		await waitFor(() => screen.getByTestId('search'))
		const search = screen.getByTestId('search')
		fireEvent.change(search, { target: { value: 'next' } })
	})

	test('import button', async () => {
		const mockData = {
			elements: [
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
			],
			num_elements: 1
		}

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		const mockFamilies = { elements: [{ id: 1, name: 'Family 1' }] }

		const familiesSpy = jest.spyOn({ fetchFamilies }, 'fetchFamilies')
		familiesSpy.mockResolvedValue({ data: mockFamilies })

		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))

		const axiosDeleteSpy = jest.spyOn(axios, 'delete')
		axiosDeleteSpy.mockResolvedValue()

		render(<DeliveriesList />)
		const fileInput = screen.getByTestId('file')

		// Generate a file to upload
		const file = new File(['test.xls'], 'test.xls', {
			type: 'application/vnd.ms-excel'
		})

		// Simulate file upload
		await fireEvent.change(fileInput, {
			target: { files: [file] }
		})
	})
})
