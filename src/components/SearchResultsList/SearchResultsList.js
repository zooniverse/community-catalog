import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import fetchSearchResults from '@src/helpers/fetchSearchResults.js'

import SearchResult from './SearchResult.js'

function SearchResultsList ({
  query = '',
}) {
  const store = useStores()
  const project = store.project
  const projectSlug = project?.slug || ''
  const titleField = project?.titleField || ''
  const [ searchResults, setSearchResults ] = useState([])

  useEffect(function () {
    if (project) fetchSearchResults(project, query, setSearchResults)
  }, [ project, query ])

  return (
    <Box
      background='light-1'
      border={true}
      pad='small'
      gap='small'
    >
      <Text>Search results for "{query}":</Text>
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