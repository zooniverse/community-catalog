import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'

import SubjectImage from '@src/components/SubjectImage'
import fetchTagSearchResults from '@src/helpers/fetchTagSearchResults.js'

export default function ResultsList ({
  query = 'tables',
}) {
  const [ searchResults, setSearchResults ] = useState([])

  useEffect(function () {
    fetchTagSearchResults(query, setSearchResults)
  }, [ query ])

  return (
    <Box
      background='light-1'
      border={true}
      pad='small'
      gap='small'
    >
      <Text>Results for the tag "{query}" on Talk:</Text>
      <Box
        direction='row'
        gap='medium'
        wrap={true}
      >
        {searchResults.map(sr => (
          <SubjectImage
            subjectId={sr.taggable_id.toString()}
            key={sr.taggable_id}
            small={true}
            width={200}
            height={200}
          />
        ))}
      </Box>
      {(searchResults.length === 0) && <Text>No items found, sorry</Text>}
    </Box>
  )
}
