import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import fetchKeywords from '@src/helpers/fetchKeywords'

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
    <Box>
      <Text>
        Subject Keywords: {keywordsData.map(keyword => keyword.name).join(', ')}
      </Text>
    </Box>
  )
}
