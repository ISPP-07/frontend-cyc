/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, describe, expect } from '@jest/globals'
import Searchbar from '../../app/components/searchbar.jsx'

describe('Searchbar component', () => {
	test('renders searchbar correctly', () => {
		const { getByText } = render(<Searchbar />)

		const altaButton = getByText('Dar de alta')

		fireEvent.click(altaButton)
	})
	test('handleChange', () => {
		const { getByTestId } = render(<Searchbar />)
		const search = getByTestId('search')
		fireEvent.change(search, { target: { value: 'test' } })
		expect(search.value).toBe('test')
	})
})
