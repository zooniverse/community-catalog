import { useEffect, useState } from 'react'
import { Box, Grid, Heading, Text } from 'grommet'
import { useParams } from 'react-router-dom'

import SubjectViewer from '@src/components/SubjectViewer'
import SearchResultsList from '@src/components/SearchResultsList'
import SubjectKeywords from '@src/components/SubjectKeywords'
import SubjectMetadata from '@src/components/SubjectMetadata'

import strings from '@src/strings.json'
import useStores from '@src/store/useStores.js'
import fetchSubject from '@src/helpers/fetchSubject.js'
import getQuery from '@src/helpers/getQuery.js'

export default function SubjectPage () {
  const [ subjectData, setSubjectData ] = useState(undefined)

  const { project } = useStores()
  const params = useParams()
  const subjectId = params.subjectId
  const query = getQuery()

  useEffect(function () {
    fetchSubject(subjectId, setSubjectData)
    window.scrollTo(0, 0)
  }, [ subjectId ])

  return (
    <>
      <Heading as='h2' margin={{ horizontal: 'medium' }}>
        {(subjectId)
          ? strings.pages.subject_page.title.replace(/{subject_id}/g, subjectId)
          : strings.pages.subject_page.no_subject
        }
      </Heading>
      <Grid
        rows={['auto', 'auto']}
        columns={['auto', 'auto']}
        pad='medium'
        gap='small'
        areas={[
          { name: 'subject-viewer', start: [0, 0], end: [1, 0] },
          { name: 'subject-discussion', start: [1, 0], end: [1, 0] },
          { name: 'subject-metadata-and-keywords', start: [0, 1], end: [0, 1] },
          { name: 'additional-actions', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box
          gridArea='subject-viewer'
          align='center'
        >
          <SubjectViewer
            subject={subjectData}
            width={800}
            height={500}
          />
        </Box>
        <Box
          background='light-2'
          gridArea='subject-discussion'
        >
          <Text color='drawing-pink'>Subject Discussion</Text>
        </Box>
        <Box
          border={{ color: 'light-3', size: 'small', style: 'solid', side: 'top' }}
          gridArea='subject-metadata-and-keywords'
          direction='row'
          gap='small'
          justify='around'
        >
          <SubjectMetadata subject={subjectData} />
          <SubjectKeywords subject={subjectData} />
        </Box>
        <Box
          border={true}
          gridArea='additional-actions'
        >
          <Text color='drawing-pink'>Additional Actions</Text>
        </Box>
      </Grid>
      <SearchResultsList query={query} />
    </>
  )
}