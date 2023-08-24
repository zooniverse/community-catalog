import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom' 
import App from './App.js'

// mock Panoptes auth calls
import auth from 'panoptes-client/lib/auth'
jest.mock('panoptes-client/lib/auth')
auth.checkCurrent.mockResolvedValue(null)

describe('App', function () {
  test('should render logo', async function () {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    const logo = await screen.findByText(/Zooniverse Logo/i)
    expect(logo).toBeInTheDocument()
  })
})
