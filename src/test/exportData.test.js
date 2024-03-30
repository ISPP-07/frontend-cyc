import { exportData } from '../app/exportData.js'
import exportFromJSON from 'export-from-json'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'

jest.mock('export-from-json')

describe('exportData', () => {
	test('exports data successfully', () => {
		const data = [
			{ id: 1, name: 'name 1', quantity: 25 },
			{ id: 2, name: 'name 2', quantity: 59 }
		]

		exportData(data, 'test', 'columnas')

		expect(exportFromJSON).toHaveBeenCalledTimes(1)
		expect(exportFromJSON).toHaveBeenCalledWith({
			data,
			fileName: 'test',
			exportType: exportFromJSON.types.xls,
			fields: 'columnas'
		})
	})
	test('exports data erroneously', () => {
		exportFromJSON.mockImplementation(() => {
			throw new Error('Error al exportar')
		})
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
		const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

		exportData([], 'nombre')

		expect(consoleSpy).toHaveBeenCalled()
		expect(alertSpy).toHaveBeenCalledWith('No se han encontrado datos')

		consoleSpy.mockRestore()
		alertSpy.mockRestore()
	})
})
