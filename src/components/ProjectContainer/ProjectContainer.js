import React, { useEffect } from 'react'
import { Heading } from 'grommet'
import { Outlet, useParams } from 'react-router-dom'

import { useStores } from '@src/store/useStores.js'
import projectsJson from '@src/projects.json'


export default function ProjectContainer ({}) {
  const store = useStores()

  const params = useParams()
  const projectOwner = params.projectOwner || ''
  const projectName = params.projectName || ''
  const projectSlug = `${projectOwner}/${projectName}`.toLowerCase()
  const selectedProject = projectsJson.projects.find(p => p.slug === projectSlug)

  useEffect(function () {
    store.setProject(selectedProject)
  }, [ selectedProject ])

  console.log('+++ ProjectContainer')

  if (!selectedProject) return null

  return (
    <>
      <Heading as='h1'>{selectedProject.name}</Heading>
      <Outlet />
    </>
  )
}
