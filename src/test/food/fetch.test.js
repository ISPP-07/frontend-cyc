/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchDataFoods } from '../../app/food/fetchDataFoods.js'
import axios from 'axios'

jest.mock('axios')

describe('fetchFood', () => {
	test('fetches successfully data from an API', async () => {
		const data = [
			{ id: 1, name: 'name 1', quantity: 25 },
			{ id: 2, name: 'name 2', quantity: 59 }
		]

		axios.get.mockResolvedValue({ data })

		const food = await fetchDataFoods()

		expect(food).toEqual(data)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchDataFoods()).toBeNull
	})
})
