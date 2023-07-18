import { useContext, useEffect, useState } from 'react'
import { Box, CheckBox, ResponsiveContext, Spinner, Text } from 'grommet'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import fetchSearchResults from '@src/helpers/fetchSearchResults.js'

import SearchResult from './SearchResult.js'

function SearchResultsList ({
  query = '',
}) {
  const size = useContext(ResponsiveContext)
  const { project, showingSensitiveContent, setShowingSensitiveContent } = useStores()
  const titleField = project?.titleField || ''
  const [ searchResults, setSearchResults ] = useState([])
  const [ status, setStatus ] = useState('ready')  // ready|fetching|error

  useEffect(function onQueryChange () {
    setStatus('ready')
    setSearchResults([])
  }, [ query ])

  useEffect(function onProjectOrQueryChange () {
    async function doFetchData () {
      if (project) {
        try {
          setStatus('fetching')
          await fetchSearchResults(project, query, setSearchResults)
          setStatus('ready')

        } catch (err) {
          setStatus('error')
          console.error(err)
        }
      }
    }
    doFetchData()
  }, [ project, query ])

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
      {(status === 'ready' && searchResults.length === 0) && (<Text textAlign='center'>{strings.components.search_results_list.no_results}</Text>)}
      {(status === 'fetching') && (<Box direction='row' justify='center'><Spinner /></Box>)}
      {(status === 'error') && (<Text color='red' textAlign='center'>{strings.general.error}</Text>)}
    </Box>
  )
}

export default observer(SearchResultsList)