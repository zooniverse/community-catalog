import { render, screen } from '@testing-library/react'
import App from './App.js'

test('should render title', () => {
  render(<App />)
  const title = screen.getByText(/Zooniverse Community Catalog/i)
  expect(title).toBeInTheDocument()
})
