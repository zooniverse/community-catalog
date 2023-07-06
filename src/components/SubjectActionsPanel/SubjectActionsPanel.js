import { Box, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'

import strings from '@src/strings.json'

export default function SubjectActionsPanel ({
  project, subject
}) {
  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
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