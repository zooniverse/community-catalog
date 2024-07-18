import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Box, Spinner } from 'grommet'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import { useStores } from '@src/store'
import projectsJson from '@src/projects.json'
import fetchProjectData from '@src/helpers/fetchProjectData.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

export default function ProjectContainer ({}) {
  const { setProject, projectData, setProjectData } = useStores()
  const [ status, setStatus ] = useState(READY)

  const params = useParams()
  const projectOwner = params.projectOwner || ''
  const projectName = params.projectName || ''
  const projectSlug = `${projectOwner}/${projectName}`.toLowerCase()
  const selectedProject = projectsJson.projects.find(p => p.slug === projectSlug)

  async function doFetchData (projectId) {
    if (!projectId) return
    try {
      setStatus(FETCHING)
      const projectData = await fetchProjectData(projectId?.toString?.())
      setProjectData(projectData)
      setStatus(READY)
    } catch (err) {
      setStatus(ERROR)
      console.error('<ProjectContainer>', err)
    }
  }

  function onUnload () {
    setProject(undefined)
    setProjectData(undefined)
  }

  useEffect(function onTargetChange_setData () {
    setProject(selectedProject)
    doFetchData(selectedProject.id)
    return onUnload
  }, [ selectedProject ])

  if (!selectedProject) throw new Error(strings?.errors?.could_not_find_project || 'Could not find project')

  if (selectedProject && !projectData) {
    return (
      <Box
        align='center'
        justify='center'
        pad='small'
      >
        <Spinner
          message={{
            start: strings.messages.project_data_fetching,
            end: strings.messages.project_data_ready
          }}
        />
      </Box>
    )
  }

  return (
    <Outlet />
  )
}
