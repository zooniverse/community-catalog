import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { talkAPI } from '@zooniverse/panoptes-js'

import SubjectImage from '@src/components/SubjectImage'

async function fetchTagSearchResults (
  query = '',
  setData = (data) => { console.log('fetchTagSearchResults: ', data)
}) {
  // Example: https://talk.zooniverse.org/tags/popular?http_cache=true&page=1&taggable_type=Subject&section=project-7929&name=flares
  try {
    const response = await talkAPI.get('/tags/popular', {
      section: 'project-12268',  // Scarlets & Blues ; requires ?env=production
      taggable_type: 'Subject',
      page: 1,
      page_size: 20,
      name: query
    })

    if (!response?.ok) throw new Error('Couldn\'t fetch tag search results')

    const results = response.body?.popular || []
    setData(results)

  } catch (err) {
    console.error(err)
  }
}

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
