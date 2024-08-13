import { Anchor, Box, Layer, Paragraph as P, Text } from 'grommet'
import styled from 'styled-components' 
import { Article as ClassifyIcon } from 'grommet-icons'

import strings from '@src/strings.json'

const StyledLink = styled(Anchor)`
  color: #000000;
  text-decoration: none;
  text-transform: uppercase;
`

export default function WorkflowSelectionDialog ({
  project = undefined,
  subject = undefined,
  workflows = [],
  show = false,
  onClose = () => {}
}) {
  if (!show || !project || !subject) return null

  const subjectSetsLinkedToSubject = subject?.links?.subject_sets
  const validWorkflows = workflows.filter(wf => (
    wf.links?.subject_sets.some(sset => subjectSetsLinkedToSubject?.includes(sset))
  ))
  // Note: only active workflows are saved in the store, so we don't need to
  // filter for workflow.active = true.
  
  return (
    <Layer
      animation="fadeIn"
      className='workflow-selection-dialog'
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box
        background='light-1'
        border={true}
        pad={{ top: "small", right: "large", bottom: "large", left: "large" }}
      >
        <P>{strings.components.workflow_selection_dialog.choose_your_workflow}</P>
        {validWorkflows.map(workflow => {
          const classifySubjectUrl = project.classify_url?.replace(/{workflow_id}/g, workflow.id).replace(/{subject_id}/g, subject.id)
          const label = workflow.display_name || `Workflow ${workflow.id}`
          return (
            <Box key={`workflow-${workflow.id}`}>
              <StyledLink
                gap='xsmall'
                href={classifySubjectUrl}
                icon={<ClassifyIcon size='small' />}
                label={<Text>{label}</Text>}
                margin='small'
              />
            </Box>
          )
        })}

      </Box>
    </Layer>
  )
}
