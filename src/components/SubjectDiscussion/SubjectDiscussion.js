import { Anchor, Box, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'

const StyledLink = styled(Anchor)`
  color: #000000;
  text-decoration: none;
`

export default function SubjectDiscussion ({
  project, subject
}) {
  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  return (
    <Box
      background='light-2'
      pad='small'
    >
      <Text>{strings.components.subject_discussion.title}</Text>
      <StyledLink
        href={'https://www.google.com'}
        label={strings.components.subject_discussion.view_on_talk}
      />
    </Box>

  )
}