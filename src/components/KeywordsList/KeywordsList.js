import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Text } from 'grommet'
import styled from 'styled-components'

import fetchKeywords from '@src/helpers/fetchKeywords.js'

const KeywordLink = styled(Link)`
  text-decoration: none;
`

const KeywordText = styled(Text)`
  text-decoration: none;
`

export default function KeywordsList () {
  const [ keywords, setKeywords ] = useState([])

  useEffect(function () {
    fetchKeywords(setKeywords)
  }, [])

  console.log('+++ keywords: ', keywords)

  return (
    <Box>
      <Box
        background='#ffffff'
        pad='small'
      >
        <Text>Use these keywords to start exploring:</Text>
      </Box>
      <Box
        background='accent-1'
        direction='row'
        pad='small'
        gap='small'
        wrap={true}
      >
        {keywords.map((keyword, i) => (
          <KeywordLink to={`/search?query=${encodeURIComponent(keyword.name)}`}>
            <Box
              background='#ffffff'
              margin={{ bottom: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='#000000'>#{keyword.name}</Text>
            </Box>
          </KeywordLink>
        ))}
        {(keywords.length === 0) && <Text>No keywords found, sorry</Text>}
      </Box>
      <Box
        align='end'
        alignContent='end'
        pad='small'
      >
        <Text color='drawing-pink'>Advanced Search &nbsp; &nbsp; Show more</Text>
      </Box>
    </Box>
  )
}
