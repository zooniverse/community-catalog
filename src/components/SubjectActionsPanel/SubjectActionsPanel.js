import { Anchor, Button, Box, Text } from 'grommet'
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

const StyledButton = styled(Button)`
  color: #000000;
  text-decoration: none;
  text-transform: uppercase;
`

export default function SubjectActionsPanel ({
  project,
  subject,
  showWorkflowSelection = () => {}
}) {
  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  // Some projects only have one Workflow, so clicking on the "Classify Subject"
  // link will immediately open that Subject on that Workflow. Other projects
  // have more than one workflow, so we need to open the workflow selection
  // dialog.
  const useWorkflowSelection = Array.isArray(project.classify_url)
  const classifySubjectUrl = (useWorkflowSelection)
    ? '#'
    : project.classify_url?.replace(/{subject_id}/g, subject.id)

  console.log('+++ useWorkflowSelection', useWorkflowSelection)

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
      {(useWorkflowSelection) ? (
        <StyledButton
          alignSelf="start"
          gap='xsmall'
          icon={<ClassifyIcon size='small' />}
          label={<Text>{strings.components.subject_actions.classify_subject}</Text>}
          margin='small'
          onClick={showWorkflowSelection}
          plain={true}
        />
      ) : (
        <StyledLink
          gap='xsmall'
          href={classifySubjectUrl}
          icon={<ClassifyIcon size='small' />}
          label={<Text>{strings.components.subject_actions.classify_subject}</Text>}
          margin='small'
        />
      )}
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