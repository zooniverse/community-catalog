import { Box, Text } from 'grommet'
import styled from 'styled-components'

import Link from '@src/components/Link'

const ProjectLink = styled(Link)`
  text-decoration: none;
`

export default function ProjectCard ({
  project
}) {
  if (!project) return null

  return (
    <ProjectLink keepQuery={false} to={`/projects/${project.slug}`}>
      <Box
        width='200px'
        background='light-1'
        pad='small'
        margin='small'
      >
        <Text>{project.name}</Text>
      </Box>
    </ProjectLink>
  )
}
