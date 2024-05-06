/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchDeliveryFamily } from '../../../app/families/[id]/fetchDeliveryFamily'
import axios from 'axios'

jest.mock('axios')

describe('fetchDeloveryFamily', () => {
	test('fetches successfully data from an API', async () => {
		const data = {
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
					family_id: '1'
				}
			],
			num_elements: 2
		}
		axios.get.mockResolvedValue({ data })

		const delivery = await fetchDeliveryFamily(1)

		expect(delivery).toEqual(data)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchDeliveryFamily(1)).toBeNull
	})
})
