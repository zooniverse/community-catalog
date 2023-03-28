import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'

import fetchKeywords from '@src/helpers/fetchKeywords.js'

export default function KeywordsList () {
  const [ keywords, setKeywords ] = useState([])

  useEffect(function () {
    fetchKeywords(setKeywords)
  }, [])

  return (
    <Box
      background='accent-1'
      pad='small'
      gap='small'
      wrap={true}
    >
      {keywords.map(keyword => (
        <Text>#{keyword.name}</Text>
      ))}
      {(keywords.length === 0) && <Text>No keywords found, sorry</Text>}
    </Box>
  )
}
