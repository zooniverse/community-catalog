import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import fetchSearchResults from '@src/helpers/fetchSearchResults.js'

import SearchResult from './SearchResult.js'

function SearchResultsList ({
  query = '',
}) {
  const { project } = useStores()
  const projectSlug = project?.slug || ''
  const titleField = project?.titleField || ''
  const [ searchResults, setSearchResults ] = useState([])

  useEffect(function () {
    if (project) fetchSearchResults(project, query, setSearchResults)
  }, [ project, query ])

  return (
    <Box
      background='light-1'
      pad='small'
      gap='small'
    >
      <Text>{
        (query)
        ? strings.components.search_results_list.search_results.replace(/{query}/g, query)
        : strings.components.search_results_list.search_results_all  /* No query, so show all results */
      }</Text>
      <Box
        direction='row'
        gap='medium'
        justify='center'
        wrap={true}
      >
        {searchResults.map(subjectId => (
          <SearchResult
            subjectId={subjectId}
            projectSlug={projectSlug}
            titleField={titleField}
            key={subjectId}
          />
        ))}
      </Box>
      {(searchResults.length === 0) && <Text>{strings.components.search_results_list.no_results}</Text>}
    </Box>
  )
}

export default observer(SearchResultsList)