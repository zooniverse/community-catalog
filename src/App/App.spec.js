import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom' 
import App from './App.js'

// mock Panoptes auth calls
jest.mock('panoptes-client/lib/auth', () => {
  return {
    __esModule: true,
    default: {
      checkCurrent: () => {
        return Promise.resolve(null)
      }
    }
  }
})

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
