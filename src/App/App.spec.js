import { render, screen, waitFor } from '@testing-library/react'
import App from './App.js'

jest.mock('panoptes-client/lib/auth')  // mock Panoptes auth calls

test('should render title', async function () {
  render(<App />)
  const title = await screen.findByText(/Zooniverse Community Catalog/i)
  expect(title).toBeInTheDocument()
})
