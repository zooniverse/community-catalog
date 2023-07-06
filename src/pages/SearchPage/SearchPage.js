import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'

import AdvancedSearchForm from '@src/components/AdvancedSearchForm'
import SearchResultsList from '@src/components/SearchResultsList'
import getQuery from '@src/helpers/getQuery'
import { useStores } from '@src/store'

function SearchPage () {
  const query = getQuery() || ''
  const { project } = useStores()
  const location = useLocation();
  
  useEffect(() => {
    console.log('Query parameters changed, refreshing Search Page.')
  }, [ location ])

  return (
    <>
      <AdvancedSearchForm project={project} />
      <SearchResultsList query={query} />
    </>
  )
}

export default observer(SearchPage)