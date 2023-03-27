import React from 'react'
import { Box, Button, Carousel, Text } from 'grommet'

import SubjectImage from '@src/components/SubjectImage'
import ResultsList from '@src/components/SearchResultsList'
import getQuery from '@src/helpers/getQuery'

export default function HomePage () {
  const imgWidth = 600
  const imgHeight = 300

  const query = getQuery() || 'tables'

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
          
          <Button
            alignSelf='end'
            background='drawing-pink'
            color='drawing-pink'
            label='Random Subject'
          />
        </Box>
      </Box>
      <ResultsList query={query} />
    </>
  )
}