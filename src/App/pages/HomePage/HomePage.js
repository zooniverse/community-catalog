import React from 'react'
import { Box } from 'grommet'
import SubjectImage from '@src/App/components/SubjectImage/SubjectImage'

export default function HomePage () {
  return (
    <Box>
      Home page

      <Box>
        <SubjectImage
          subjectId='69734802'
          small={true}
        />
      </Box>
    </Box>
  )
}