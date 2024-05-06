/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import WarehouseList from '../../../app/food/warehouse/page'
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
describe('WarehouseList', () => {
	jest.mock('axios')

	test('render warehouses', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: mockData })

		render(<WarehouseList />)
		const elements = await screen.findAllByTestId('warehouse-data')
		expect(elements).toHaveLength(mockData.length)
	})
	test('render warehouses error', async () => {
		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockRejectedValue(null)

		render(<WarehouseList />)
		const elements = screen.queryAllByTestId('warehouse-data')
		expect(elements).toHaveLength(0)
	})
	test('create warehouse', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPostSpy = jest.spyOn(axios, 'post')
		axiosSpy.mockResolvedValue({ data: mockData })
		render(<WarehouseList />)
		const showButton = await screen.findByText('Añadir almacén')
		fireEvent.click(showButton)
		const nameInput = await screen.findByTestId('nombre')
		fireEvent.change(nameInput, { target: { value: 'testTyping' } })
		expect(await screen.getByText('Nombre:')).toBeDefined()
		expect(nameInput.value).toBe('testTyping')

		const createButton = await screen.findByTestId('create-update-button')
		fireEvent.click(createButton)
		expect(axiosPostSpy).toHaveBeenCalled()
		axiosPostSpy.mockRestore()
	})
	test('create warehouse no name', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPostSpy = jest.spyOn(axios, 'post')
		axiosSpy.mockResolvedValue({ data: mockData })
		render(<WarehouseList />)
		const showButton = await screen.findByText('Añadir almacén')
		fireEvent.click(showButton)
		const nameInput = await screen.findByTestId('nombre')
		expect(await screen.getByText('Nombre:')).toBeDefined()
		expect(nameInput.value).toBe('')

		const createButton = await screen.findByTestId('create-update-button')
		fireEvent.click(createButton)
		expect(axiosPostSpy).toHaveBeenCalledTimes(0)
		axiosPostSpy.mockRestore()
	})
	test('create warehouse same name', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPostSpy = jest.spyOn(axios, 'post')
		axiosSpy.mockResolvedValue({ data: mockData })
		axiosPostSpy.mockRejectedValue({ response: { status: 400 } })

		render(<WarehouseList />)
		const showButton = await screen.findByText('Añadir almacén')
		fireEvent.click(showButton)

		const nameInput = await screen.findByTestId('nombre')
		fireEvent.change(nameInput, { target: { value: 'testTyping' } })
		expect(await screen.getByText('Nombre:')).toBeDefined()
		expect(nameInput.value).toBe('testTyping')

		const createButton = await screen.findByTestId('create-update-button')
		fireEvent.click(createButton)
		expect(axiosPostSpy).toHaveBeenCalled()
		axiosPostSpy.mockRestore()
	})

	test('import button', async () => {
		const mockData = [
			{ id: 1, name: 'name 1', quantity: 24 },

			{ id: 2, name: 'name 2', quantity: 59 }
		]

		// Mocking fetchDataFoods function
		const fetchDataFoods = jest.fn()
		fetchDataFoods.mockResolvedValue(mockData)

		render(<WarehouseList />)
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
