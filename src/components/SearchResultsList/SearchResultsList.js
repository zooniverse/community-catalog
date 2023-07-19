import { useContext, useEffect, useState } from 'react'
import { Anchor, Box, CheckBox, ResponsiveContext, Spinner, Text } from 'grommet'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import strings from '@src/strings.json'
import { ASYNC_STATES } from '@src/config.js'
import { useStores } from '@src/store'
import fetchSearchResults from '@src/helpers/fetchSearchResults.js'

import SearchResult from './SearchResult.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES
const CleanLink = styled(Anchor)`
  text-decoration: none;
`

function SearchResultsList ({
  query = '',
}) {
  const size = useContext(ResponsiveContext)
  const { project, showingSensitiveContent, setShowingSensitiveContent } = useStores()
  const titleField = project?.titleField || ''
  const [ searchResults, setSearchResults ] = useState([])
  const [ status, setStatus ] = useState(READY)  // ready|fetching|error
  const [ page, setPage ] = useState(1)
  const [ moreToShow, setMoreToShow ] = useState(true)  // If there's more to show, then we should show "Show More", you dig?

  useEffect(function onQueryChange () {
    setSearchResults([])
    setStatus(READY)
    setPage(1)
    setMoreToShow(true)
  }, [ query ])

  useEffect(function onProjectOrQueryChange () {
    doFetchData(1)
  }, [ project, query ])

  async function doFetchData (pageToFetch = 1) {
    if (project) {
      try {
        setPage(pageToFetch)
        setStatus(FETCHING)
        const subjectIds = await fetchSearchResults(project, query, pageToFetch)
        addToSearchResults(subjectIds)
        setStatus(READY)

      } catch (err) {
        setStatus('error')
        console.error(err)
      }
    }
  }

  function addToSearchResults (subjectIds = []) {
    const newResults = [ ...searchResults, ...subjectIds ]
    const noDuplicates = Array.from(new Set(newResults))
    setSearchResults(noDuplicates)
    if (subjectIds.length === 0) setMoreToShow(false)
  }

  const showMoreButton = (status === READY) && query.trim().length > 0  // Don't show "Show More" for the randomised Subjects

  function fetchMore () {
    if (status !== READY) return
    doFetchData(page + 1)
  }

  return (
    <Box
      background='light-1'
      className='search-results-list'
      pad='small'
      gap='small'
    >
      <Box
        direction={(size !== 'small') ? 'row' : 'column'}
      >
        <Text>{
          (query)
          ? strings.components.search_results_list.search_results.replace(/{query}/g, query)
          : strings.components.search_results_list.search_results_random  /* No query, so show all results */
        }</Text>
        <Box flex='grow' />
        <CheckBox
          checked={showingSensitiveContent}
          onChange={e => setShowingSensitiveContent(!!e?.target?.checked)}
          label={<Text>{strings.components.search_results_list.show_sensitive_images}</Text>}
          reverse={(size !== 'small')}
        />
      </Box>
      <Box
        direction='row'
        justify={(size !== 'small') ? 'start' : 'center'}
        wrap={true}
      >
        {searchResults.map(subjectId => (
          <SearchResult
            subjectId={subjectId}
            project={project}
            titleField={titleField}
            key={subjectId}
            showSensitive={showingSensitiveContent}
          />
        ))}
      </Box>
      {(status === READY && searchResults.length === 0) && (<Text textAlign='center'>{strings.components.search_results_list.no_results}</Text>)}
      {(status === FETCHING) && (<Box direction='row' justify='center'><Spinner /></Box>)}
      {(status === ERROR) && (<Text color='red' textAlign='center'>{strings.general.error}</Text>)}
      {(showMoreButton) && (moreToShow ? (
        <Box direction='row' justify='end'>
          <CleanLink onClick={fetchMore}>
            <Text color='black' weight='normal'>{strings.components.search_results_list.show_more}</Text>
          </CleanLink>
          </Box>
      ) : (
        <Box direction='row' justify='end'>
          <CleanLink>
            <Text color='black' weight='normal'>{strings.components.search_results_list.no_more}</Text>
          </CleanLink>
        </Box>
      ))}
    </Box>
  )
}

export default observer(SearchResultsList)