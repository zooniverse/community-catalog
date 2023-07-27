import { useEffect, useState } from 'react'
import { Box, Spinner, Text } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { ASYNC_STATES } from '@src/config.js'
import { useStores } from '@src/store'
import fetchKeywords from '@src/helpers/fetchKeywords.js'
import Link from '@src/components/Link'
import removeDuplicates from '@src/helpers/removeDuplicates.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

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
  const [ status, setStatus ] = useState(READY)
  const [ page, setPage ] = useState(1)
  const [ moreToShow, setMoreToShow ] = useState(true)  // If there's more to show, then we should show "Show More", you dig?

  useEffect(function onTargetChange_resetThenFetchData () {
    setKeywordsData([])
    setStatus(READY)
    setPage(1)
    setMoreToShow(true)
    doFetchData(1)
  }, [ project ])

  async function doFetchData (pageToFetch = 1) {
    if (project) {
      try {
        setPage(pageToFetch)
        setStatus(FETCHING)
        let keywords = await fetchKeywords(projectId, pageToFetch)
        keywords = keywords?.map(k => k.name) || [] // Flatten

        if (pageToFetch === 1 && project.keywords_to_always_suggest) {  // On initial fetch, add "always suggested" keywords.
          keywords = [ ...project.keywords_to_always_suggest, ...keywords ]
        }

        if (project.keywords_to_never_suggest) {  // Remove any "never suggest" keywords
          keywords = keywords.filter(k => !project.keywords_to_never_suggest.includes(k))
        }

        keywords = removeDuplicates(keywords)  // Remove duplicates

        addToKeywordsData(keywords)
        setStatus(READY)

      } catch (err) {
        setStatus(ERROR)
        console.error('<KeywordsList>', err)
      }
    }
  }

  function addToKeywordsData (keywords = []) {
    const newKeywords = [ ...keywordsData, ...keywords ]
    setKeywordsData(newKeywords)
    if (keywords.length === 0) setMoreToShow(false)
  }

  function fetchMore () {
    if (status !== READY) return
    doFetchData(page + 1)
  }

  /*
  function getMoreKeywords () {
    setPage(page + 1)
  }

  function addToKeywordsData (data) {
    setKeywordsData([ ...keywordsData, ...data ])
    if (data.length === 0) setMoreToShow(false)
  }

  /*
  useEffect(function onTargetChange_fetchData () {
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
  */

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
        wrap={true}
      >
        {keywordsData.map((keyword, i) => (
          <CleanLink to={`/projects/${projectSlug}/search?query=${encodeURIComponent(keyword)}`} key={`keyword-${i}`}>
            <KeywordBox
              background='white'
              elevation='xsmall'
              margin={{ bottom: 'small', right: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='black'>#{keyword}</Text>
            </KeywordBox>
          </CleanLink>
        ))}
        {(status === READY && keywordsData.length === 0) && (<Text>{strings.messages.no_keywords_found}</Text>)}
      </Box>
      <Box
        direction='row'
        justify='end'
        pad='small'
      >
        {(status === READY) && (moreToShow ? (
          <CleanLink onClick={fetchMore}>
            <Text color='black'>{strings.components.keywords_list.show_more}</Text>
          </CleanLink>
        ) : (
          <CleanLink>
            <Text color='black'>{strings.components.keywords_list.no_more}</Text>
          </CleanLink>
        ))}
        {(status === FETCHING) && <Spinner />}
        {(status === ERROR) && (<Text color='red'>{strings.general.error}</Text>)}
      </Box>
    </Box>
  )
}

export default observer(KeywordsList)