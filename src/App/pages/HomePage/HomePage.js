import React from 'react'
import { Box, Carousel } from 'grommet'
import SubjectImage from '@src/App/components/SubjectImage'

export default function HomePage () {
  const imgWidth = 600
  const imgHeight = 300

  return (
    <Box
      background='dark-1'
      pad='small'
    >
      <Box
        alignSelf='center'
        width={`${imgWidth}px`}
      >
        Home Page
        <Carousel
          wrap={true}
        >
          <SubjectImage
            subjectId='69734802'
            width={imgWidth}
            height={imgHeight}
          />
          <SubjectImage
            subjectId='69734801'
            width={imgWidth}
            height={imgHeight}
          />
          <SubjectImage
            subjectId='69734803'
            width={imgWidth}
            height={imgHeight}
          />
        </Carousel>
      </Box>
    </Box>
  )
}