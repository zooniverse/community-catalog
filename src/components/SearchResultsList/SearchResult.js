import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { Link } from 'react-router-dom'

import SubjectImage from '@src/components/SubjectImage'
import fetchSubject from '@src/helpers/fetchSubject.js'

export default function SearchResult ({
  subjectId = '',
}) {
  const [ subjectData, setSubjectData ] = useState(null)

  useEffect(function () {
    if (subjectId) fetchSubject(subjectId, setSubjectData)
  }, [ subjectId ])

  return (
    <Link
      to={`/subject/${subjectId}`}
    >
      <Box
        background='white'
        elevation='small'
        width='200px'
        margin={{ bottom: 'small' }}
      >
        <SubjectImage
          subject={subjectData}
          small={true}
          width={200}
          height={200}
        />
        <Box pad='small'>
          <Text color='drawing-pink'>Lorem Ipsum, I don't know what should be here</Text>
        </Box>
      </Box>
    </Link>
  )
}
