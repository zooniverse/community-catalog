import { Anchor, Box, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'

const StyledLink = styled(Anchor)`
  text-decoration: none;
`

export default function SubjectDiscussion ({
  project, subject
}) {
  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  const viewOnTalkUrl = project.viewOnTalkUrl?.replace(/{subject_id}/g, subject.id)

  return (
    <Box
      background='light-2'
      pad='small'
    >
      <Text size='large'>{strings.components.subject_discussion.title}</Text>
      <StyledLink href={viewOnTalkUrl}>
        <Text>{strings.components.subject_discussion.view_on_talk}</Text>
      </StyledLink>
    </Box>

  )
}