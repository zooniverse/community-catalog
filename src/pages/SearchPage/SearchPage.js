import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'

import SearchResultsList from '@src/components/SearchResultsList'
import getQuery from '@src/helpers/getQuery'

function SearchPage () {
  const query = getQuery() || ''
  const location = useLocation()
  
  useEffect(function onUrlChange () {
    console.log('Query parameters changed, refreshing Search Page.')
  }, [ location ])

  return (
    <SearchResultsList query={query} />
  )
}

export default observer(SearchPage)