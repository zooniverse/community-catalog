import { Box, Text } from 'grommet'
import styled from 'styled-components'

import ProjectCard from '@src/components/ProjectCard'
import projectsJson from '@src/projects.json'

import strings from '@src/strings.json'
import { HOME_PAGE_BACKGROUND_IMAGE_URL } from '@src/config.js'

const IntroBox = styled(Box)`
  max-width: 36.5em;
`

const ProjectsContainerOuter = styled(Box)`
  background: #808080 url(${HOME_PAGE_BACKGROUND_IMAGE_URL});
  background-size: 120% auto;
  background-position: center 30%;
`

const ProjectsContainer = styled(Box)`
  backdrop-filter: sepia(5%) hue-rotate(120deg) blur(6px);
`

function HomePage () {
  return (
    <Box
      background='dark-1'
      className='home-page'
    >
      <IntroBox
        direction='column'
        alignSelf='center'
        pad='medium'
      >
        <Text>{strings.pages.home_page.intro}</Text>
      </IntroBox>
      <Box
        background='white'
        direction='column'
        align='center'
        alignContent='center'
        justify='center'
        pad='small'
      >
        <Text
          size='large'
          weight='bold'
        >
          {strings.pages.home_page.pick_a_project}
        </Text>
      </Box>
      <ProjectsContainerOuter>
        <ProjectsContainer
          direction='row'
          wrap={true}
          justify='center'
          pad='small'
        >
          {projectsJson.projects.map(proj => (
            <ProjectCard
              project={proj}
              key={`project-${proj.id}`} 
            />
          ))}
        </ProjectsContainer>
      </ProjectsContainerOuter>
      <Box background='white' pad='small' />
    </Box>
  )
}

export default HomePage
