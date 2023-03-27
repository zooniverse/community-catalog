import React from 'react'
import { Box, Carousel } from 'grommet'
import SubjectImage from '@src/App/components/SubjectImage'

export default function HomePage () {
  const size = 300

  return (
    <Box>
      Home page

      <Carousel
        wrap={true}
        width='300px'
        alignSelf='center'
      >
        <SubjectImage
          subjectId='69734802'
          width={size}
          height={size}
        />
        <SubjectImage
          subjectId='69734801'
          width={size}
          height={size}
        />
        <SubjectImage
          subjectId='69734803'
          width={size}
          height={size}
        />
      </Carousel>
      
    </Box>
  )
}