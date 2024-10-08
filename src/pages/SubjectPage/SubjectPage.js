import { useContext, useEffect, useState } from 'react'
import { Box, Grid, ResponsiveContext, Text } from 'grommet'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import SearchResultsList from '@src/components/SearchResultsList'
import SubjectDiscussion from '@src/components/SubjectDiscussion'
import SubjectKeywords from '@src/components/SubjectKeywords'
import SubjectMetadata from '@src/components/SubjectMetadata'
import SubjectViewer from '@src/components/SubjectViewer'
import WorkflowSelectionDialog from '@src/components/WorkflowSelectionDialog'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import useStores from '@src/store/useStores.js'
import fetchSubject from '@src/helpers/fetchSubject.js'
import getQuery from '@src/helpers/getQuery.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

function SubjectPage () {
  const [ subjectData, setSubjectData ] = useState(undefined)
  const [ status, setStatus ] = useState(READY)
  const [ workflowSelectionVisible, setWorkflowSelectionVisible ] = useState(false)
  const size = useContext(ResponsiveContext)

  const { project, workflowsData, showingSensitiveContent, setShowingSensitiveContent } = useStores()
  const params = useParams()
  const subjectId = params.subjectId
  const query = getQuery()

  useEffect(function onTargetChange_resetThenFetchData () {
    setSubjectData(undefined)
    setStatus(READY)
    doFetchData(subjectId)

    window.scrollTo(0, 0)  // TODO: improve scroll target
  }, [ subjectId ])

  async function doFetchData (subjectId) {
    if (!subjectId) return
    try {
      setStatus(FETCHING)
      const subject = await fetchSubject(subjectId)
      setSubjectData(subject)
      setStatus(READY)
    } catch (err) {
      setStatus(ERROR)
      console.error('<SubjectPage>', err)
    }
  }

  const isNarrowView = size === 'small'
  const rows = (!isNarrowView) ? ['auto', 'auto'] : ['auto', 'auto', 'auto']
  const columns = (!isNarrowView) ? ['auto', '400px'] : ['auto']
  const areas = (!isNarrowView)
    ? [
        { name: 'subject-viewer', start: [0, 0], end: [0, 0] },
        { name: 'subject-discussion', start: [1, 0], end: [1, 1] },
        { name: 'subject-metadata-and-keywords', start: [0, 1], end: [0, 1] },
      ]
    : [
        { name: 'subject-viewer', start: [0, 0], end: [0, 0] },
        { name: 'subject-metadata-and-keywords', start: [0, 1], end: [0, 1] },
        { name: 'subject-discussion', start: [0, 2], end: [0, 2] },
      ]
  
  function openWorkflowSelection () {
    setWorkflowSelectionVisible(true)
  }

  function closeWorkflowSelection () {
    setWorkflowSelectionVisible(false)
  }

  return (
    <Box
      className='subject-page'
    >
      {(status === ERROR) && (
        <Text
          margin={{ horizontal: 'small', vertical: 'xsmall' }}
          size='1.1em'
          color='red'
        >
          {strings.general.error}
        </Text>
      )}
      <Grid
        rows={rows}
        columns={columns}
        pad='small'
        gap='small'
        areas={areas}
      >
        <Box
          gridArea='subject-viewer'
          align='center'
        >
          <SubjectViewer
            openWorkflowSelection={openWorkflowSelection}
            project={project}
            showSensitive={showingSensitiveContent}
            setShowSensitive={setShowingSensitiveContent}
            subject={subjectData}
          />
        </Box>
        <Box
          gridArea='subject-discussion'
        >
          <SubjectDiscussion
            project={project}
            subject={subjectData}
          />
        </Box>
        <Box
          gridArea='subject-metadata-and-keywords'
          direction='row'
          gap='small'
          justify='around'
          pad={{ top: 'small' }}
        >
          <SubjectMetadata subject={subjectData} project={project} />
          <SubjectKeywords subject={subjectData} />
        </Box>
        {/*
        <Box
          gridArea='subject-actions'
        >
          <SubjectActionsPanel
            project={project}
            subject={subjectData}
            showWorkflowSelection={showWorkflowSelection}
          />
        </Box>
        */}
      </Grid>
      <SearchResultsList query={query} />
      <WorkflowSelectionDialog
        project={project}
        subject={subjectData}
        workflows={workflowsData}
        show={workflowSelectionVisible}
        onClose={closeWorkflowSelection}
      />
    </Box>
  )
}

export default observer(SubjectPage)
