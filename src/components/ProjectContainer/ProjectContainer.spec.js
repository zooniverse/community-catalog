import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom' 
import ProjectContainer from './ProjectContainer.js'

import projectsJson from '@src/projects.json'
const testProject = projectsJson.projects.find(p => p.slug === 'darkeshard/community-catalog')

import { AppContext } from '@src/store'

describe.only('ProjectContainers', function () {
  const store = {
    project: testProject,
    user: null,
    showingSensitiveContent: false,
    setProject: (p) => { console.log('+++ p: ', p) },
    setUser: () => {},
    setShowingSensitiveContent: () => {},
  }

  test('should find a project based on the route/path', async function () {
    render(
      <AppContext.Provider value={store}>
        <MemoryRouter initialEntries={[
          '/projects/darkeshard/community-catalog'  /* Input: path to the intended project */
        ]}>
          <Routes>
            <Route
              path='/projects/:projectOwner/:projectName'
              element={<ProjectContainer />}  /* Output: we expect ProjectContainer to call setProject() with the intended project */
            />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    )

    // TODO: check if the project is set.
  })
})
