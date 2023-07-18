import { useContext, useEffect, useState } from 'react'
import { Box, CheckBox, ResponsiveContext, Spinner, Text } from 'grommet'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { ASYNC_STATES } from '@src/config.js'
import { useStores } from '@src/store'
import fetchSearchResults from '@src/helpers/fetchSearchResults.js'

import SearchResult from './SearchResult.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

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
    doFetchData()
  }, [ project, query ])

  async function doFetchData () {
    if (project) {
      try {
        setStatus(FETCHING)
        const subjectIds = await fetchSearchResults(project, query, page)
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
  }

  const showMoreButton = moreToShow && query.trim().length > 0

  return (
    <Box
      background='light-1'
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
        gap='medium'
        justify='center'
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
    </Box>
  )
}

export default observer(SearchResultsList)