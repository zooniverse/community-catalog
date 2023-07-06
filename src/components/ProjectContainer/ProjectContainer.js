import { useEffect } from 'react'
import { Heading, Text } from 'grommet'
import { Outlet, useParams } from 'react-router-dom'
import styled from 'styled-components'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import projectsJson from '@src/projects.json'
import Link from '@src/components/Link'

const ProjectLink = styled(Link)`
  text-decoration: none;
`

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

  if (!selectedProject) throw new Error(strings?.errors?.could_not_find_project || 'Could not find project')

  return (
    <>
      <ProjectLink to={`/projects/${projectSlug}`}>
        <Heading
          level='1'
          color='dark-4'
          textAlign='center'
          truncate={true}
        >
          {selectedProject.name}
        </Heading>
      </ProjectLink>
      <Outlet />
    </>
  )
}
