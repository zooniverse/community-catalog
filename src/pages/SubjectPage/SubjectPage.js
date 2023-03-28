import React, { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useParams } from 'react-router-dom'

import SubjectImage from '@src/components/SubjectImage'
import SearchResultsList from '@src/components/SearchResultsList'
import fetchSubject from '@src/helpers/fetchSubject.js'
import getQuery from '@src/helpers/getQuery.js'

export default function SubjectPage () {
  const [ subjectData, setSubjectData ] = useState(undefined)

  const params = useParams()
  const subjectId = params.subjectId
  const query = getQuery()

  useEffect(function () {
    fetchSubject(subjectId, setSubjectData)
  }, [])

  return (
    <Box>
      <Box
        pad='medium'
      >
        <Heading as='h2'>
          Subject page &nbsp;
          {subjectId ? `for subject ${subjectId}` : '(no subject chosen)'}
        </Heading>
        <Box direction='row'>
          <SubjectImage
            subject={subjectData}
            width={600}
            height={600}
          />
          <Box>Subject Discussion</Box>
        </Box>
      </Box>
      <Box
        direction='row'
        gap='small'
        pad='small'
      >
        <Box>
          <Box
            direction='row'
            gap='small'
            pad='small'
          >
            <Text>Add to Favorites</Text>
            <Text>Add to Collection</Text>
            <Text>Classify this Subject</Text>
          </Box>
          <Box
            direction='row'
            gap='small'
            width='600px'
          >
            <Box>
              <Text>Metadata</Text>
            </Box>
            <Box>
              <Text>Tags</Text>
            </Box>
          </Box>
        </Box>
        <Box border={true}>
          <Text>Your Activity</Text>
        </Box>

      </Box>
      <SearchResultsList query={query} />
    </Box>
  )
}