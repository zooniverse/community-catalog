import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>ERROR NOT FOUND</h1>,
    children: [
      {
        path: 'search',
        element: <h1>Search</h1>,
      }

    ]
  },
])