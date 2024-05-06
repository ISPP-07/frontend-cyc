/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { fireEvent, render } from '@testing-library/react'
import { test, describe, jest } from '@jest/globals'
import AddElementForm from '../app/components/AddElementForm.jsx'

describe('AddElementForm', () => {
	jest.mock('axios')
	jest.mock('../app/food/warehouse/fetchDataWarehouse.js')
	test('Create form renders', () => {
		// jest.spyOn(global, 'fetchDataWarehouse').mockResolvedValueOnce({
		// 	data: [
		// 		{
		// 			id: 1,
		// 			name: 'Almacen 1'
		// 		},
		// 		{
		// 			id: 2,
		// 			name: 'Almacen 2'
		// 		}
		// 	]
		// })
		const { getByTestId } = render(<AddElementForm />)

		fireEvent.change(getByTestId('name'), { target: { value: 'test' } })
		fireEvent.change(getByTestId('exp_date'), {
			target: { value: '2025-12-12' }
		})
		fireEvent.change(getByTestId('quantity'), { target: { value: 1 } })
		fireEvent.change(getByTestId('warehouse_id'), { target: { value: 1 } })
		fireEvent.submit(getByTestId('create'))
	})
})
