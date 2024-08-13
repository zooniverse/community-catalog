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

  if (!Array.isArray(project.classify_url)) {
    console.error('<WorkflowSelectionDialog>', strings.errors.expected_classify_url_to_be_array)
    throw new Error(strings.errors.expected_classify_url_to_be_array)
  }

  const subjectSetsLinkedToSubject = subject?.links?.subject_sets
  const validWorkflows = workflows.filter(wf => (
    wf.links?.subject_sets.some(sset => subjectSetsLinkedToSubject?.includes(sset))
  ))
  
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
        {project.classify_url.map((({ label, url }) => {
          const classifySubjectUrl = url?.replace(/{subject_id}/g, subject.id)
          return (
            <Box>
              <StyledLink
                gap='xsmall'
                href={classifySubjectUrl}
                icon={<ClassifyIcon size='small' />}
                label={<Text>{label}</Text>}
                margin='small'
              />
            </Box>
          )
        }))}

      </Box>
    </Layer>
  )
}
