import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'

import AdvancedSearchForm from '@src/components/AdvancedSearchForm'
import SearchResultsList from '@src/components/SearchResultsList'
import getQuery from '@src/helpers/getQuery'
import { useStores } from '@src/store'

function SearchPage () {
  const query = getQuery() || ''
  const store = useStores()
  const project = store.project

  console.log('+++ project', project)

  return (
    <>
      <AdvancedSearchForm project={project} />
      <SearchResultsList query={query} />
    </>
  )
}

export default observer(SearchPage)