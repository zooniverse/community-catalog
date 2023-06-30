import { Box } from 'grommet'

import strings from '@src/strings.json'

export default function AdvancedSearchForm ({ project }) {
  if (!project) return null

  return (
    <Box>
      Advanced Search
    </Box>
  )
}
