import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { Box } from 'grommet'

import SearchResultsList from '@src/components/SearchResultsList'
import getQuery from '@src/helpers/getQuery'

function SearchPage () {
  const query = getQuery() || ''
  const location = useLocation()
  
  useEffect(function onUrlChange () {
    console.log('Query parameters changed, refreshing Search Page.')
  }, [ location ])

  return (
    <Box
      className='search-page'
    >
      <SearchResultsList query={query} />
    </Box>
  )
}

export default observer(SearchPage)