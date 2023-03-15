import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'

import HomePage from '@src/App/pages/HomePage'
import SearchPage from '@src/App/pages/SearchPage'
import SubjectPage from '@src/App/pages/SubjectPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Page not found</h1>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'subject',
        element: <h1>Search</h1>,
      }

    ]
  },
])