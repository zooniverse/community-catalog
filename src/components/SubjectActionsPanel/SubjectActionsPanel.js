import { Box, Text } from 'grommet'

import strings from '@src/strings.json'

export default function SubjectActionsPanel ({
  project, subject
}) {
  if (!project || !subject) return (
    <Box>
      <Text>...</Text>
    </Box>
  )

  return (
    <Box
      border={true}
      elevation='small'
      pad='xsmall'
      round='xsmall'
    >
      Subject Actions Panel
    </Box>

  )
}