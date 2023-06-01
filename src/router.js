import { createBrowserRouter } from 'react-router-dom'
import App from '@src/App'

import ProjectContainer from '@src/components/ProjectContainer'
import HomePage from '@src/pages/HomePage'
import SearchPage from '@src/pages/SearchPage'
import SubjectPage from '@src/pages/SubjectPage'
import Tester from '@src/components/Tester'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Unspecified Error</h1>,
    children: [
      {
        path: '/projects/:projectOwner/:projectName',
        element: <ProjectContainer />,
        children: [
          {
            path: '',
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
      }
    ]
  },
])