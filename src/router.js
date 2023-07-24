import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '@src/App'

import HomePage from '@src/pages/HomePage'
import ProjectContainer from '@src/components/ProjectContainer'
import ProjectPage from '@src/pages/ProjectPage'
import SearchPage from '@src/pages/SearchPage'
import SubjectPage from '@src/pages/SubjectPage'

import getEnv from '@src/helpers/getEnv.js'
import getQuery from '@src/helpers/getQuery.js'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Unspecified Error</h1>,
    children: [
      {
        /*
        Community Catalog home/landing Page
         */
        path: '',
        element: <HomePage />,
      },
      {
        path: '/projects/:projectOwner/:projectName',
        element: <ProjectContainer />,
        children: [
          {
            /*
            Project home page
             */
            path: '',
            element: <ProjectPage />,
          },
          {
            /*
            Search results page
             */
            path: 'search',
            element: <SearchPage />,
          },
          {
            /*
            Subject page (with no ID, this is actually invalid)
             */
            path: 'subject',
            element: <SubjectPage />,
          },
          {
            /*
            Subject page
             */
            path: 'subject/:subjectId',
            element: <SubjectPage />,
          },
          {
            /*
            Redirect "Talk keywords" to search:
            When users type in hashtag #keywords in Talk, Markdownz will render
            that as a link with a specific format. We need to translate that
            "Talk keyword link" to a Community Catalog search query.
             */
            path: 'talk/search',
            element: null,
            loader: async ({ request, params }) => {
              console.log('+++ request, params: ', request, params)

              const env = getEnv()
              const query = getQuery(request.url) || ''

              const redirectUrl = `/projects/${params.projectOwner}/${params.projectName}?query=${query}${env ? `&env=${env}` : ''}`

              console.log('+++ redirectUrl ', redirectUrl)

              return null
              // return redirect(redirectUrl)
            },        
          },
        ]
      }
    ]
  },
])