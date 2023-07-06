import { Anchor, Box, Text } from 'grommet'
import {
  Code as CodeIcon,
  Clipboard as ClassifyIcon,
  ShareOption as ShareIcon,
} from 'grommet-icons'
import styled from 'styled-components'

import Link from '@src/components/Link'
import strings from '@src/strings.json'

const StyledLink = styled(Anchor)`
  color: ${props => props.color};
  text-decoration: none;
  text-transform: uppercase;
`

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
      <StyledLink
        color='#000000'
        gap='xsmall'
        href={classifySubjectUrl}
        icon={<ClassifyIcon size='small' />}
        label={<Text>{strings.components.subject_actions.classify_subject}</Text>}
        margin='small'
      />
    </Box>

  )
}