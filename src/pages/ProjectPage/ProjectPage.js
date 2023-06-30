import { useEffect } from 'react'
import { Box, Button, Carousel, Text } from 'grommet'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import Link from '@src/components/Link'
import SubjectImage from '@src/components/SubjectImage'
import SearchResultsList from '@src/components/SearchResultsList'
import KeywordsList from '@src/components/KeywordsList'
import RandomButton from '@src/components/RandomButton'
import getQuery from '@src/helpers/getQuery'

function ProjectPage () {
  const store = useStores()
  const project = store.project
  const projectSlug = project?.slug || ''
  const exampleSubjects = project?.exampleSubjects || []
  const exampleQuery = project?.exampleQuery || ''

  const imgWidth = 600
  const imgHeight = 300

  const query = getQuery() || exampleQuery

  return (
    <>
      <Box
        background='dark-1'
        pad='small'
      >
        <Box
          alignSelf='center'
          gap='small'
          width={`${imgWidth}px`}
        >
          <Carousel
            wrap={true}
          >
            {exampleSubjects.map(sbjId => (
              <Box>
                <Text color='drawing-pink'>TODO: description for each subject</Text>
            
                <Link to={`/projects/${projectSlug}/subject/${sbjId}`} key={`home-subject-${sbjId}`}>
                  <SubjectImage
                    subjectId={sbjId}
                    width={imgWidth}
                    height={imgHeight}
                  />
                </Link>
              </Box>
            ))}
          </Carousel>
          <RandomButton
            project={project}
            alignSelf='end'
          />
        </Box>
      </Box>
      <KeywordsList />
      <SearchResultsList query={query} />
    </>
  )
}

export default observer(ProjectPage)
