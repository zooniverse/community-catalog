import { Box, Text } from 'grommet'

import SearchResultsList from '@src/components/SearchResultsList'
import KeywordsList from '@src/components/KeywordsList'
import getQuery from '@src/helpers/getQuery'

export default function SearchPage () {
  const query = getQuery() || ''

  return (
    <>
      <Box
        border={true}
        pad='medium'
        margin='medium'
      >
        <Text color='drawing-pink'>Advanced Search Options/Filters</Text>
      </Box>
      <SearchResultsList query={query} />
    </>
  )
}