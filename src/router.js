import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>ERROR NOT FOUND</h1>,
  },
])