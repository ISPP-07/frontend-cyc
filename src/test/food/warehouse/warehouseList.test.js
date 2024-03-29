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
	test('update warehouse', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPutSpy = jest.spyOn(axios, 'put')
		axiosSpy.mockResolvedValue({ data: mockData })
		render(<WarehouseList />)
		const elements = await screen.findAllByTestId('warehouse-data')
		const buttons = elements[0].getElementsByTagName('button')
		fireEvent.click(buttons[0])
		const updateButton = await screen.findByTestId('create-update-button')
		fireEvent.click(updateButton)

		expect(axiosPutSpy).toHaveBeenCalled()
		expect(await screen.getByText(mockData[1].name)).toBeDefined()
		axiosPutSpy.mockRestore()
	})
	test('close update warehouse modal', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPutSpy = jest.spyOn(axios, 'put')
		axiosSpy.mockResolvedValue({ data: mockData })
		render(<WarehouseList />)
		const elements = await screen.findAllByTestId('warehouse-data')
		const buttons = elements[0].getElementsByTagName('button')
		fireEvent.click(buttons[0])
		const closeButton = await screen.findByTestId('close-button')
		fireEvent.click(closeButton)

		expect(axiosPutSpy).toHaveBeenCalledTimes(0)
		expect(await screen.getByText(mockData[1].name)).toBeDefined()
		axiosPutSpy.mockRestore()
	})
	test('delete warehouse', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))
		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosDeleteSpy = jest.spyOn(axios, 'delete')
		axiosSpy.mockResolvedValue({ data: mockData })
		axiosDeleteSpy.mockResolvedValue()
		render(<WarehouseList />)
		const elements = await screen.findAllByTestId('warehouse-data')
		const buttons = elements[0].getElementsByTagName('button')
		fireEvent.click(buttons[1])

		expect(axiosDeleteSpy).toHaveBeenCalled()
	})
	test('delete warehouse error 404', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))
		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosDeleteSpy = jest.spyOn(axios, 'delete')
		axiosSpy.mockResolvedValue({ data: mockData })
		axiosDeleteSpy.mockRejectedValue({ response: { status: 404 } })
		render(<WarehouseList />)
		const elements = await screen.findAllByTestId('warehouse-data')
		const buttons = elements[0].getElementsByTagName('button')
		fireEvent.click(buttons[1])

		expect(axiosDeleteSpy).toHaveBeenCalled()
	})
	test('delete warehouse error', async () => {
		const mockData = [
			{ id: 1, name: 'name 1' },
			{ id: 2, name: 'name 2' }
		]

		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))
		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosDeleteSpy = jest.spyOn(axios, 'delete')
		axiosSpy.mockResolvedValue({ data: mockData })
		axiosDeleteSpy.mockRejectedValue({ response: { status: 500 } })
		render(<WarehouseList />)
		const elements = await screen.findAllByTestId('warehouse-data')
		const buttons = elements[0].getElementsByTagName('button')
		fireEvent.click(buttons[1])

		expect(axiosDeleteSpy).toHaveBeenCalled()
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
})
