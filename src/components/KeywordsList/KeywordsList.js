import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import fetchKeywords from '@src/helpers/fetchKeywords.js'
import Link from '@src/components/Link'

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
        <Text>{strings.components.keywords_list.start_exploring}</Text>
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
        {(keywordsData.length === 0) && <Text>{strings.messages.no_keywords_found}</Text>}
      </Box>
      <Box
        align='end'
        alignContent='end'
        pad='small'
      >
        <Text color='drawing-pink'>{strings.components.keywords_list.advanced_search} &nbsp; &nbsp; {strings.components.keywords_list.show_more}</Text>
      </Box>
    </Box>
  )
}

export default observer(KeywordsList)