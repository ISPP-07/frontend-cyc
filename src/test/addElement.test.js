/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import AddElementForm from '../app/components/AddElementForm.jsx'

describe('AddElementForm', () => {
	test('Create form renders', () => {
		const { getByText } = render(<AddElementForm />)
		const nombre = getByText('Nombre:')
		const cantidadTotal = getByText('Cantidad Total:')
		const cantidadAlmacen1 = getByText('Cantidad en Almacén 1:')
		const cantidadAlmacen2 = getByText('Cantidad en Almacén 2:')
		expect(nombre).toBeDefined()
		expect(cantidadTotal).toBeDefined()
		expect(cantidadAlmacen1).toBeDefined()
		expect(cantidadAlmacen2).toBeDefined()
	})
})
