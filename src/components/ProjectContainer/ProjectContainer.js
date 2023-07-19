import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import projectsJson from '@src/projects.json'

export default function ProjectContainer ({}) {
  const store = useStores()

  const params = useParams()
  const projectOwner = params.projectOwner || ''
  const projectName = params.projectName || ''
  const projectSlug = `${projectOwner}/${projectName}`.toLowerCase()
  const selectedProject = projectsJson.projects.find(p => p.slug === projectSlug)

  useEffect(function onTargetChange_setData () {
    store.setProject(selectedProject)
  }, [ selectedProject ])

  if (!selectedProject) throw new Error(strings?.errors?.could_not_find_project || 'Could not find project')

  return (
    <Outlet />
  )
}
