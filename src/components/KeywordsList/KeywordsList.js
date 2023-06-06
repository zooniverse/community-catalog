import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import fetchKeywords from '@src/helpers/fetchKeywords.js'

const KeywordLink = styled(Link)`
  text-decoration: none;
`
function KeywordsList () {
  const store = useStores()
  const projectId = store.project?.id
  const projectSlug = store.project?.slug
  const [ keywordsData, setKeywordsData ] = useState([])

  useEffect(function () {
    fetchKeywords(
      projectId,
      setKeywordsData
    )

  }, [ projectId ])

  return (
    <Box elevation='medium'>
      <Box
        background='white'
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
        {keywordsData.map((keyword, i) => (
          <KeywordLink to={`/projects/${projectSlug}/search?query=${encodeURIComponent(keyword.name)}`} key={`keyword-${i}`}>
            <Box
              background='white'
              elevation='xsmall'
              margin={{ bottom: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='black'>#{keyword.name}</Text>
            </Box>
          </KeywordLink>
        ))}
        {(keywordsData.length === 0) && <Text>No keywords found, sorry</Text>}
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

export default observer(KeywordsList)