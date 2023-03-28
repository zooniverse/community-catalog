import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'

import HomePage from '@src/pages/HomePage'
import SearchPage from '@src/pages/SearchPage'
import SubjectPage from '@src/pages/SubjectPage'
import Tester from '@src/components/Tester'

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
        element: <SubjectPage />,
      },
      {
        path: 'subject/:subjectId',
        element: <SubjectPage />,
      },
      {
        path: 'test',
        element: <Tester />,
      },
    ]
  },
])