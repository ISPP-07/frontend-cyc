/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import Modal from '../../app/families/modal.jsx'

describe('Modal component', () => {

  test('renders checkbox group correctly', () => {
    const { getByText } = render(<Modal />)
    
    const altaButton = getByText('Dar de Alta')
    const checkbox0to3 = getByText('0-3')
    const nombreInput = getByText('Nombre')

    expect(checkbox0to3).toBeDefined()
    expect(nombreInput).toBeDefined()
    
    fireEvent.click(altaButton)
    
  })
  test('closes modal and redirects to families page', () => {

    const { getByText } = render(<Modal />)
    
    const closeButton = getByText('X')
    fireEvent.click(closeButton)

  })

})
