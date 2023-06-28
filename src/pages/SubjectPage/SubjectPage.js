import { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useParams } from 'react-router-dom'

import SubjectImage from '@src/components/SubjectImage'
import SearchResultsList from '@src/components/SearchResultsList'
import SubjectKeywords from '@src/components/SubjectKeywords'
import SubjectMetadata from '@src/components/SubjectMetadata'

import strings from '@src/strings.json'
import fetchSubject from '@src/helpers/fetchSubject.js'
import getQuery from '@src/helpers/getQuery.js'

export default function SubjectPage () {
  const [ subjectData, setSubjectData ] = useState(undefined)

  const params = useParams()
  const subjectId = params.subjectId
  const query = getQuery()

  useEffect(function () {
    fetchSubject(subjectId, setSubjectData)
    window.scrollTo(0, 0)
  }, [ subjectId ])

  return (
    <>
      <Box
        pad='medium'
      >
        <Heading as='h2'>
          {(subjectId)
            ? strings.pages.subject_page.title.replace(/{subject_id}/g, subjectId)
            : strings.pages.subject_page.no_subject
          }
        </Heading>
        <Box
          direction='row'
          gap='medium'
        >
          <SubjectImage
            subject={subjectData}
            width={800}
            height={500}
          />
          <Box border={true} color='drawing-pink'>Subject Discussion</Box>
        </Box>
      </Box>
      <Box
        direction='row'
        gap='medium'
        pad='small'
      >
        <Box>
          <Box
            direction='row'
            gap='small'
            pad='small'
          >
            <Text color='drawing-pink'>Add to Favorites</Text>
            <Text color='drawing-pink'>Add to Collection</Text>
            <Text color='drawing-pink'>Classify this Subject</Text>
          </Box>
          <Box
            direction='row'
            gap='small'
            justify='around'
            width='800px'
          >
            <SubjectMetadata subject={subjectData} />
            <SubjectKeywords subject={subjectData} />
          </Box>
        </Box>
        <Box border={true}>
          <Text color='drawing-pink'>Your Activity</Text>
        </Box>

      </Box>
      <SearchResultsList query={query} />
    </>
  )
}