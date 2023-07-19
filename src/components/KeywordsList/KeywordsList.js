import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import fetchKeywords from '@src/helpers/fetchKeywords.js'
import Link from '@src/components/Link'

const CleanLink = styled(Link)`
  text-decoration: none;
`

const KeywordBox = styled(Box)`
  &:hover {
    background: #00979d;
  }

  &:active {
    background: #005D69;
  }
`

function KeywordsList () {
  const { project } = useStores()
  const projectId = project?.id
  const projectSlug = project?.slug
  const [ keywordsData, setKeywordsData ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ moreToShow, setMoreToShow ] = useState(true)  // If there's more to show, then we should show "Show More", you dig?

  function getMoreKeywords () {
    setPage(page + 1)
  }

  function addToKeywordsData (data) {
    setKeywordsData([ ...keywordsData, ...data ])
    if (data.length === 0) setMoreToShow(false)
  }

  useEffect(function () {
    if (page <= 1) {  // Reset if necessary
      setKeywordsData([])
      setMoreToShow(true)
    }

    fetchKeywords(
      projectId,
      addToKeywordsData,
      page
    )

  }, [ projectId, page ])

  return (
    <Box
      className='keywords-list'
      elevation='medium'
    >
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
          <CleanLink to={`/projects/${projectSlug}/search?query=${encodeURIComponent(keyword.name)}`} key={`keyword-${i}`}>
            <KeywordBox
              background='white'
              elevation='xsmall'
              margin={{ bottom: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='black'>#{keyword.name}</Text>
            </KeywordBox>
          </CleanLink>
        ))}
        {(keywordsData.length === 0) && <Text>{strings.messages.no_keywords_found}</Text>}
      </Box>
      <Box
        direction='row'
        justify='end'
        pad='small'
      >
        {moreToShow ? (
          <CleanLink onClick={getMoreKeywords}>
            <Text color='black'>{strings.components.keywords_list.show_more}</Text>
          </CleanLink>
        ) : (
          <CleanLink>
            <Text color='black'>{strings.components.keywords_list.no_more}</Text>
          </CleanLink>
        )}
      </Box>
    </Box>
  )
}

export default observer(KeywordsList)