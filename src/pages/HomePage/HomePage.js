import { Box, Text } from 'grommet'
import styled from 'styled-components'

import Link from '@src/components/Link'
import projectsJson from '@src/projects.json'

import strings from '@src/strings.json'

const IntroBox = styled(Box)`
  max-width: 36.5em;
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
        <Text color='white'>{strings.pages.home_page.intro}</Text>
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
          color='black'
          size='large'
          weight='bold'
        >
          {strings.pages.home_page.pick_a_project}
        </Text>
      </Box>
      <Box
        direction='row'
        wrap={true}
        justify='center'
        pad='small'
        background='red'
      >
        {projectsJson.projects.map(proj => (
          <Box
            width='200px'
            key={`project-${proj.id}`}
            background='light-1'
            pad='small'
            margin='small'
          >
            <Link keepQuery={false} to={`/projects/${proj.slug}`}>{proj.name}</Link>
          </Box>
        ))}
      </Box>
      <Box background='white' pad='small' />
    </Box>
  )
}

export default HomePage
