import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import fetchTalkSearchResults from '@src/helpers/fetchTalkSearchResults.js'
import fetchDatabaseSearchResults from '@src/helpers/fetchDatabaseSearchResults.js'

import SearchResult from './SearchResult.js'

function SearchResultsList ({
  query = '',
}) {
  const store = useStores()
  const projectId = store.project?.id
  const projectSlug = store.project?.slug || ''
  const titleField = store.project?.titleField || ''
  const [ searchResults, setSearchResults ] = useState([])

  useEffect(function () {
    fetchTalkSearchResults(projectId, query, setSearchResults)
    fetchDatabaseSearchResults(projectId, query, (data) => { console.log('+++ data: ', data) })
  }, [ projectId, query ])

  return (
    <Box
      background='light-1'
      border={true}
      pad='small'
      gap='small'
    >
      <Text>Results for the tag "{query}" on Talk:</Text>
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
      {(searchResults.length === 0) && <Text>No items found, sorry</Text>}
    </Box>
  )
}

export default observer(SearchResultsList)