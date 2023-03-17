import { act, render, screen } from '@testing-library/react'
import App from './App.js'

// mock Panoptes auth calls
import auth from 'panoptes-client/lib/auth'
jest.mock('panoptes-client/lib/auth')
auth.checkCurrent.mockResolvedValue(null)

describe('App', function () {
  test('should render logo', async function () {
    act(function () {
      render(<App />)
    })
  
    const logo = await screen.findByText(/Zooniverse Logo/i)
    expect(logo).toBeInTheDocument()
  })

  /*
  describe('when user isn\'t logged in', function () {
    test('should display "isn\'t logged in" message', async function () {
      auth.checkCurrent.mockResolvedValue(null)
      render(<App />)
      const userText = await screen.findByText(/User isn't logged in/i)
      expect(userText).toBeInTheDocument()
    })
  })

  describe('when user is logged in', function () {
    test('should display user details', async function () {
      auth.checkCurrent.mockResolvedValue({
        display_name: 'Test User',
        login: 'testuser',
      })
      render(<App />)
      const userText = await screen.findByText(/Logged in as Test User/i)
      expect(userText).toBeInTheDocument()
    })
  })
  */
})
