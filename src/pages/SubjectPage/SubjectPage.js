import React from 'react'
import { Box } from 'grommet'
import { useParams } from 'react-router-dom'

export default function SubjectPage () {
  const params = useParams()
  const subjectId = params.subjectId

  return (
    <Box>
      Subject page &nbsp;
      {subjectId ? `for subject ${subjectId}` : '(no subject chosen)'}
    </Box>
  )
}