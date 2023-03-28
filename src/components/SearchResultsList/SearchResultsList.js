import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'

import SubjectImage from '@src/components/SubjectImage'
import SearchResult from './SearchResult.js'
import fetchTagSearchResults from '@src/helpers/fetchTagSearchResults.js'

export default function SearchResultsList ({
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
        justify='center'
        wrap={true}
      >
        {searchResults.map(sr => (
          <SearchResult
            subjectId={sr.taggable_id.toString()}
            key={sr.taggable_id}
          />
        ))}
      </Box>
      {(searchResults.length === 0) && <Text>No items found, sorry</Text>}
    </Box>
  )
}
