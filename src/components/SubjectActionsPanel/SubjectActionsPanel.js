import { Anchor, Box, Text } from 'grommet'
import {
  Article as ClassifyIcon,
  BladesHorizontal as CollectionIcon,
  Code as CodeIcon,
  Favorite as FavoritesIcon,
  ShareOption as ShareIcon,
} from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'

const StyledLink = styled(Anchor)`
  color: #000000;
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
      className='subject-actions-panel'
      elevation='small'
      pad='xsmall'
      round='xsmall'
    >
      <StyledLink
        disabled={true}
        gap='xsmall'
        icon={<CollectionIcon size='small' />}
        label={<Text>{strings.components.subject_actions.add_to_collection}</Text>}
        margin='small'
      />
      <StyledLink
        gap='xsmall'
        href={classifySubjectUrl}
        icon={<ClassifyIcon size='small' />}
        label={<Text>{strings.components.subject_actions.classify_subject}</Text>}
        margin='small'
      />
      <StyledLink
        disabled={true}
        gap='xsmall'
        icon={<FavoritesIcon size='small' />}
        label={<Text>{strings.components.subject_actions.add_to_favorites}</Text>}
        margin='small'
      />
      <StyledLink
        disabled={true}
        gap='xsmall'
        icon={<ShareIcon size='small' />}
        label={<Text>{strings.components.subject_actions.share}</Text>}
        margin='small'
      />
    </Box>
  )
}