/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchFamily } from '../../../app/families/[id]/fetchFamily'
import axios from 'axios'

jest.mock('axios')

describe('fetchFamily', () => {
	test('fetches successfully data from an API', async () => {
		const data = [{ id: '123', name: 'Family 1', ages: '20-30' }]

		axios.get.mockResolvedValue({ data })

		const family = await fetchFamily(123)

		expect(family).toEqual(data)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchFamily(123)).toBeNull
	})
})
