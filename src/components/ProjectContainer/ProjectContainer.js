import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Box, Spinner, Text } from 'grommet'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import { useStores } from '@src/store'
import projectsJson from '@src/projects.json'
import fetchProjectData from '@src/helpers/fetchProjectData.js'
import fetchWorkflows from '@src/helpers/fetchWorkflows.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

export default function ProjectContainer ({}) {
  const { setProject, projectData, setProjectData, setWorkflowsData, } = useStores()
  const [ status, setStatus ] = useState(READY)

  const params = useParams()
  const projectOwner = params.projectOwner || ''
  const projectName = params.projectName || ''
  const projectSlug = `${projectOwner}/${projectName}`.toLowerCase()
  const selectedProject = projectsJson.projects.find(p => p.slug === projectSlug)

  async function doFetchData (projectId) {
    if (!projectId) return
    try {
      // Fetch project data.
      setStatus(FETCHING)
      const projectData = await fetchProjectData(projectId?.toString?.())
      setProjectData(projectData)
      setStatus(READY)

      // Fetch additional data. This doesn't block the app from rendering.
      doFetchAuxData(projectData)
      
    } catch (err) {
      setStatus(ERROR)
      console.error('<ProjectContainer>', err)
    }
  }

  async function doFetchAuxData (projectData) {
    if (!projectData) return
    try {
      const workflowsData = await fetchWorkflows(projectData?.links?.active_workflows)
      setWorkflowsData(workflowsData)
    } catch (err) {
      setStatus(ERROR)
      console.error('<ProjectContainer>', err)
    }
  }

  function onUnload () {
    setProject(undefined)
    setProjectData(undefined)
    setWorkflowsData(undefined)
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
        {(status === FETCHING) && (
          <Spinner
            message={{
              start: strings.messages.project_data_fetching,
              end: strings.messages.project_data_ready
            }}
          />
        )}
        {(status === ERROR) && (<Text color='red'>{strings.general.error}</Text>)}
      </Box>
    )
  }

  return (
    <Outlet />
  )
}
