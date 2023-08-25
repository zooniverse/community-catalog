import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom' 
import ProjectContainer from './ProjectContainer.js'

import { AppContext } from '@src/store'

describe.only('ProjectContainers', function () {
  let selectedProject
  const store = {
    project: {
      name: 'Placeholder Project',
      slug: 'foo/bar',
      id: '1234'
    },
    user: null,
    showingSensitiveContent: false,
    setProject: (p) => { selectedProject = p },
    setUser: () => {},
    setShowingSensitiveContent: () => {},
  }

  test('should find a project based on the route/path', async function () {
    selectedProject = null

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

    expect(selectedProject?.name).toEqual('Community Catalog (Stable Test Project)')
  })
})
