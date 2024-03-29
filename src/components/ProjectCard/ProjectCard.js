import { Box, Text } from 'grommet'
import styled, { keyframes } from 'styled-components'

import Link from '@src/components/Link'
import { PROJECT_CARD_HEIGHT, PROJECT_CARD_WIDTH } from '@src/config.js'

const projectDescriptionAnimation = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: ${PROJECT_CARD_HEIGHT}px;
  }
`

const ProjectLink = styled(Link)`
  text-decoration: none;

  .project-card-description {
    display: none;
  }

  &:hover, &:focus {
    .project-card-description {
      animation: 0.5s ${projectDescriptionAnimation} ease-in-out;
      display: block;
      height: ${PROJECT_CARD_HEIGHT}px;
    }
  }
`

const TitleText = styled(Text)`
  text-transform: uppercase;
`

export default function ProjectCard ({
  project
}) {
  if (!project) return null
  
  const background = (project.avatar)
    ? `url(${project.avatar})`
    : 'dark-2'

  return (
    <ProjectLink
      className='project-card'
      keepQuery={false}
      to={`/projects/${project.slug}`}
    >
      <Box
        width={`${PROJECT_CARD_WIDTH}px`}
        height={`${PROJECT_CARD_HEIGHT}px`}
        overflow='hidden'
        background={background}
        margin='small'
        justify='end'
      >
        <Box
          background='white'
          pad='small'
        >
          <TitleText
            color='dark-5'
            textAlign='center'
            weight='bold'
          >
            {project.name}
          </TitleText>
          <Text
            className='project-card-description'
            color='dark-5'
            margin={{ top: 'small' }}
            textAlign='center'
          >
            {project.description}
          </Text>
        </Box>
      </Box>
    </ProjectLink>
  )
}
