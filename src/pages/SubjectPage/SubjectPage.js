import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Heading, ResponsiveContext } from 'grommet'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import useSWR from 'swr'

import SearchResultsList from '@src/components/SearchResultsList'
import SubjectActionsPanel from '@src/components/SubjectActionsPanel'
import SubjectDiscussion from '@src/components/SubjectDiscussion'
import SubjectKeywords from '@src/components/SubjectKeywords'
import SubjectMetadata from '@src/components/SubjectMetadata'
import SubjectViewer from '@src/components/SubjectViewer'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import useStores from '@src/store/useStores.js'
import fetchSubject from '@src/helpers/fetchSubject.js'
import getQuery from '@src/helpers/getQuery.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

function SubjectPage () {
  const { project, showingSensitiveContent, setShowingSensitiveContent } = useStores()
  const params = useParams()
  const subjectId = params.subjectId
  const query = getQuery()
  const size = useContext(ResponsiveContext)

  const { data: subjectData, error, isLoading } = useSWR(subjectId, fetchSubject)
  const status = (error) ? ERROR : (isLoading) ? FETCHING : READY

  useEffect(function onTargetChange_scrollToTop () {
    window.scrollTo(0, 0)  // TODO: improve scroll target
  }, [ subjectId ])

  const title = (subjectId)
    ? subjectData?.metadata?.[project?.title_field]  // Use the title field of the Subject, if any
      || strings.pages.subject_page.title.replace(/{subject_id}/g, subjectId)  //
    : strings.pages.subject_page.no_subject  // If there's no subject ID, then there's no subject.

  const isNarrowView = size === 'small'
  const rows = (!isNarrowView) ? ['auto', 'auto'] : ['auto', 'auto', 'auto', 'auto']
  const columns = (!isNarrowView) ? ['auto', '1/3'] : ['auto']
  const areas = (!isNarrowView)
    ? [
        { name: 'subject-viewer', start: [0, 0], end: [0, 0] },
        { name: 'subject-discussion', start: [1, 0], end: [1, 0] },
        { name: 'subject-metadata-and-keywords', start: [0, 1], end: [0, 1] },
        { name: 'subject-actions', start: [1, 1], end: [1, 1] },
      ]
    : [
        { name: 'subject-viewer', start: [0, 0], end: [0, 0] },
        { name: 'subject-metadata-and-keywords', start: [0, 1], end: [0, 1] },
        { name: 'subject-actions', start: [0, 2], end: [0, 2] },
        { name: 'subject-discussion', start: [0, 3], end: [0, 3] },
      ]

  return (
    <Box
      className='subject-page'
    >
      <Heading
        level='2'
        margin={{ horizontal: 'small', vertical: 'xsmall' }}
        size='1.1em'
        color={(status !== ERROR) ? undefined : 'red' }
      >
        {(status !== ERROR) ? title : strings.general.error}
      </Heading>
      <Grid
        rows={rows}
        columns={columns}
        pad={{ horizontal: 'small', vertical: 'none' }}
        margin={{ bottom: 'small' }}
        gap='small'
        areas={areas}
      >
        <Box
          gridArea='subject-viewer'
          align='center'
        >
          <SubjectViewer
            subject={subjectData}
            project={project}
            width={1000}
            height={500}
            showSensitive={showingSensitiveContent}
            setShowSensitive={setShowingSensitiveContent}
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
          border={{ color: 'light-3', size: 'small', style: 'solid', side: 'top' }}
          gridArea='subject-metadata-and-keywords'
          direction='row'
          gap='small'
          justify='around'
          pad={{ top: 'small' }}
        >
          <SubjectMetadata subject={subjectData} project={project} />
          <SubjectKeywords subject={subjectData} />
        </Box>
        <Box
          gridArea='subject-actions'
        >
          <SubjectActionsPanel project={project} subject={subjectData} />
        </Box>
      </Grid>
      <SearchResultsList query={query} />
    </Box>
  )
}

export default observer(SubjectPage)
