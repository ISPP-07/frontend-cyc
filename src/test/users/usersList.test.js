/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import UserList from '../../app/users/page'
import Home from '../../app/create-user/page'
import axios from 'axios'
import Page from '../../app/users/[userId]/page'
import UserDetails from '../../app/components/UserDetails'

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

describe('UserList', () => {
    jest.mock('axios')
    test('should render UserList', async () => {
        const data = [
            {
                id: 1,
                name: 'Test User',
                email: ''
            }
        ]
        const axiosGetSpy = jest.spyOn(axios, 'get')
        axiosGetSpy.mockResolvedValue({ data})
        render(<UserList />)
        
    })
    test('should display error message on data fetch failure', async () => {
        const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockRejectedValue(null)
        
        render(<UserList />)        
    })
    test('should handle click on CardUser', async () => {
        const mockUserData = [
            { id: 1, name: 'Test User 1', email: 'test1@example.com' },
            { id: 2, name: 'Test User 2', email: 'test2@example.com' }
        ]
        
        const axiosGetSpy = jest.spyOn(axios, 'get')
        axiosGetSpy.mockResolvedValue({ data: mockUserData })
        
        render(<UserList />)
        
        const cardUsers = await screen.findAllByTestId('card-user')
        
        fireEvent.click(cardUsers[0])
        
    })
    test('UserDetails', async () => {
        const mockUserData = [
            { id: 1, username: 'Test User 1', email: 'test1@example.com' },
            { id: 2, username: 'Test User 2', email: 'test2@example.com' }
        ]

        render(<Page params={mockUserData[0].id }/>)
        
        await screen.findByText('Detalles del usuario')
    })
    test('UserDetails2', async () => {
        const mockUserData = [
            { id: 1, username: 'Test User 1', email: 'test1@example.com' },
            { id: 2, username: 'Test User 2', email: 'test2@example.com' }
        ]

        render(<UserDetails user={mockUserData[0] }/>)
        
        await screen.findByText('Detalles del usuario')

        await screen.findByText('Nombre de usuario:')
        await screen.findByText('Test User 1')
        await screen.findByText('Correo electrónico:')
        await screen.findByText('test1@example.com')
    })

    test('UserDetails edit button click', async () => {
        const mockUserData = { id: 1, username: 'Test User 1', email: 'test1@example.com' };
    
        render(<UserDetails user={mockUserData} />);
    
        await screen.findByText('Detalles del usuario');
        const elements = await screen.findAllByTestId('user-data')
		const buttons = elements[0].getElementsByTagName('button')
    
        fireEvent.click(buttons[0]);
    
        expect(screen.getByText('Editar usuario')).toBeDefined();

        expect(screen.getByText('¿Desea cambiar la contraseña?')).toBeDefined();

        const select = await screen.findByTestId('changePassword')
        fireEvent.click(select)
    });

    

    test('create warehouse', async () => {
		const mockUserData = [
            { id: 1, name: 'Test User 1', email: 'test1@example.com' },
            { id: 2, name: 'Test User 2', email: 'test2@example.com' }
        ]

		const axiosGetSpy = jest.spyOn(axios, 'get')
		const axiosPostSpy = jest.spyOn(axios, 'post')
		axiosGetSpy.mockResolvedValue({ data: mockUserData })

		render(<UserList />)
		const showButton = await screen.findByText('Crear usuario')
		fireEvent.click(showButton)

        render(<Home />)
		const nameInput = await screen.findByTestId('nombre')
		fireEvent.change(nameInput, { target: { value: 'testTyping' } })
		expect(await screen.getByText('Usuario')).toBeDefined()
		expect(nameInput.value).toBe('testTyping')

        const emailInput = await screen.findByTestId('email')
		fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
		expect(await screen.getByText('Correo electrónico')).toBeDefined()
		expect(emailInput.value).toBe('test@example.com')

        const passInput = await screen.findByTestId('password-input')
		fireEvent.change(passInput, { target: { value: '123' } })
		expect(await screen.getByText('Contraseña')).toBeDefined()
		expect(passInput.value).toBe('123')
        
        const passConfirmInput = await screen.findByTestId('passwordConfirm-input')
		fireEvent.change(passConfirmInput, { target: { value: '123' } })
		expect(await screen.getByText('Confirmar contraseña:')).toBeDefined()
		expect(passConfirmInput.value).toBe('123')

		const createButton = await screen.findByTestId('create')
		fireEvent.click(createButton)
		expect(axiosPostSpy).toHaveBeenCalled()
		axiosPostSpy.mockRestore()
	})

    test('Delete user', async () => {
        const mockUserData = { id: 3, username: 'Test User 3', email: 'test3@example.com' };
        
        const axiosDeleteSpy = jest.spyOn(axios, 'delete')
        axiosDeleteSpy.mockResolvedValue()
        const confirmSpy = jest.spyOn(window, 'confirm')
        confirmSpy.mockImplementation(jest.fn(() => true))

        render(<UserDetails user={mockUserData} />);
    
        const elements = await screen.findAllByTestId('user-data')
		const buttons = elements[0].getElementsByTagName('button')
    
        fireEvent.click(buttons[1]);
        expect(axiosDeleteSpy).toHaveBeenCalled()
    });

})