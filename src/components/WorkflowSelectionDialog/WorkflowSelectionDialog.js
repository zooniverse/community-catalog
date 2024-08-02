import { Box, Layer, Paragraph as P } from 'grommet'

import strings from '@src/strings.json'

export default function WorkflowSelectionDialog ({
  project = undefined,
  subject = undefined,
  show = false,
  onClose = () => {}
}) {
  if (!show) return null

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
        pad="large"
      >
        <P>{strings.components.workflow_selection_dialog.choose_your_workflow}</P>
      </Box>
    </Layer>
  )
}
