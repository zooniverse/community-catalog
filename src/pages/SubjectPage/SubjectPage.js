import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Heading, ResponsiveContext } from 'grommet'
import { useParams } from 'react-router-dom'

import SearchResultsList from '@src/components/SearchResultsList'
import SubjectActionsPanel from '@src/components/SubjectActionsPanel'
import SubjectDiscussion from '@src/components/SubjectDiscussion'
import SubjectKeywords from '@src/components/SubjectKeywords'
import SubjectMetadata from '@src/components/SubjectMetadata'
import SubjectViewer from '@src/components/SubjectViewer'

import strings from '@src/strings.json'
import useStores from '@src/store/useStores.js'
import fetchSubject from '@src/helpers/fetchSubject.js'
import getQuery from '@src/helpers/getQuery.js'

export default function SubjectPage () {
  const [ subjectData, setSubjectData ] = useState(undefined)
  const size = useContext(ResponsiveContext)

  const { project } = useStores()
  const params = useParams()
  const subjectId = params.subjectId
  const query = getQuery()

  useEffect(function () {
    fetchSubject(subjectId, setSubjectData)
    // TODO: handle invalid subjects

    window.scrollTo(0, 0)  // TODO: improve scroll target
  }, [ subjectId ])

  const title = (subjectId)
    ? subjectData?.metadata?.[project?.titleField]  // Use the title field of the Subject, if any
      || strings.pages.subject_page.title.replace(/{subject_id}/g, subjectId)  //
    : strings.pages.subject_page.no_subject  // If there's no subject ID, then there's no subject.

  const isNarrowView = size === 'small'
  const rows = (!isNarrowView) ? ['auto', 'auto'] : ['auto', 'auto', 'auto', 'auto']
  const columns = (!isNarrowView) ? ['auto', 'auto'] : ['auto']
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
    <>
      <Heading
        level='2'
        margin={{ horizontal: 'small', vertical: 'xsmall' }}
        size='1.1em'
        truncate={true}
      >
        {title}
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
            width={1000}
            height={500}
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
          <SubjectMetadata subject={subjectData} />
          <SubjectKeywords subject={subjectData} />
        </Box>
        <Box
          gridArea='subject-actions'
        >
          <SubjectActionsPanel project={project} subject={subjectData} />
        </Box>
      </Grid>
      <SearchResultsList query={query} />
    </>
  )
}