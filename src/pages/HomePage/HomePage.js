import { useEffect } from 'react'
import { Box, Button, Carousel, Text } from 'grommet'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import SubjectImage from '@src/components/SubjectImage'
import SearchResultsList from '@src/components/SearchResultsList'
import KeywordsList from '@src/components/KeywordsList'
import getQuery from '@src/helpers/getQuery'

function HomePage () {
  const store = useStores()
  const projectSlug = store.project?.slug || ''
  console.log('+++ HomePage ', store.project)

  const imgWidth = 600
  const imgHeight = 300

  const query = getQuery() || 'tables'
  const subjects = [ '69734802', '69734801', '69734803' ]

  useEffect(function () {
    console.log('beep boop')
  }, [ store.project ])

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
          <Text>Examples from Project 12268, Subject Set 98889</Text>
          <Carousel
            wrap={true}
          >
            {subjects.map(sbjId => (
              <Link to={`/projects/${projectSlug}/subject/${sbjId}`} key={`home-subject-${sbjId}`}>
                <SubjectImage
                  subjectId={sbjId}
                  width={imgWidth}
                  height={imgHeight}
                />
              </Link>
            ))}
          </Carousel>
          <Button
            alignSelf='end'
            background='drawing-pink'
            color='drawing-pink'
            label='Random Subject'
          />
        </Box>
      </Box>
      <KeywordsList />
      <SearchResultsList query={query} />
    </>
  )
}

export default observer(HomePage)
