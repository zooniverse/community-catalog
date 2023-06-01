import React from 'react'
import { Box } from 'grommet'
import { Outlet, useParams } from 'react-router-dom'
import projectsJson from '@src/projects.json'

export default function ProjectContainer ({}) {
  const params = useParams()
  const projectOwner = params.projectOwner || ''
  const projectName = params.projectName || ''
  const projectSlug = `${projectOwner}/${projectName}`.toLowerCase()
  const selectedProject = projectsJson.projects.find(p => p.slug === projectSlug)

  console.log('+++ selectedProject = ', selectedProject)

  return (
    <Box>
      <Outlet />
    </Box>
  )
}
