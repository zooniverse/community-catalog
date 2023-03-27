import React, { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { talkAPI } from '@zooniverse/panoptes-js'

export default function ResultsList ({
  query = '',
}) {
  const [ searchResults, setSearchResults ] = useState([])

  async function fetchSearchResults (query) {
    // const response = await fetch()
  }

  useEffect(function () {
    fetchSearchResults(query)
  }, [ query ])


  return (
    <Box
      background='light-1'
      border={true}
    >
      ...
    </Box>
  )
}
