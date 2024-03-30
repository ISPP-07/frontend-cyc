/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchFamilies } from '../../../app/families/derecognised/fetchFamilies'
import axios from 'axios'

jest.mock('axios')

describe('fetchFamily', () => {
	test('fetches successfully data from an API', async () => {
        const data1 = [{ id: '123', name: 'Family 1', ages: '20-30' , derecognition_state: 'Suspended' }, 
        { id: '124', name: 'Family 2', ages: '30-40', derecognition_state: 'Suspended'} , { id: '125', name: 'Family 3', ages: '40-50', derecognition_state: 'Active'}]

		const data2 = [{ id: '123', name: 'Family 1', ages: '20-30' , derecognition_state: 'Suspended' }, 
        { id: '124', name: 'Family 2', ages: '30-40', derecognition_state: 'Suspended'}]

		axios.get.mockResolvedValue({data: data1 })

		const family = await fetchFamilies(123)
        console.log(family)

		expect(family).toEqual(data2)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchFamilies(123)).toBeNull
	})
})
