import { render, screen } from '@testing-library/react'
import App from './App.js'

test('should render title', () => {
  render(<App />)
  const title = screen.getByText(/Zooniverse Community Catalog/i)
  // TODO: expect(title).toBeInDocument()

  expect(1 + 1).toBe(2)
})
