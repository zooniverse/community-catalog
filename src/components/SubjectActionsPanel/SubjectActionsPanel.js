import { Box, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import Link from '@src/components/Link'

import strings from '@src/strings.json'

export default function SubjectActionsPanel ({
  project, subject
}) {
  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  const classifySubjectUrl = project.classifyUrl?.replace(/{subject_id}/g, subject.id)

  return (
    <Box
      border={true}
      elevation='small'
      pad='xsmall'
      round='xsmall'
    >
      Subject Actions Panel

      <Link
        to={classifySubjectUrl}
      >
        <Text>{strings.components.subject_actions.classify_subject}</Text>
      </Link>
    </Box>

  )
}