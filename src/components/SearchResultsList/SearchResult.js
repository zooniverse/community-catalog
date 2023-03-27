import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'

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
    <Box
    >
      <SubjectImage
        subject={subjectData}
        small={true}
        width={200}
        height={200}
      />
    </Box>
  )
}
