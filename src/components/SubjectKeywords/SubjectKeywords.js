import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import fetchKeywords from '@src/helpers/fetchKeywords'

const KeywordLink = styled(Link)`
  text-decoration: none;
`

export default function SubjectKeywords ({
  subject = undefined,
}) {

  const [ keywordsData, setKeywordsData ] = useState([])

  useEffect(function () {
    if (subject) {
      fetchKeywords({
        setData: setKeywordsData,
        subject
      })
    }
  }, [ subject ])

  return (
    <Box border={true} align='end'>
      <Text color='light-6' margin={{ bottom: 'small' }}>
        COMMUNITY TAGS:
      </Text>
      <Box
        direction='row'
        gap='small'
        wrap={true}
      >
        {keywordsData.map((keyword, i) => (
          <KeywordLink to={`/search?query=${encodeURIComponent(keyword.name)}`}>
            <Box
              background='light-2'
              elevation='xsmall'
              margin={{ bottom: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='#000000'>#{keyword.name}</Text>
            </Box>
          </KeywordLink>
        ))}
      </Box>
    </Box>
  )
}
