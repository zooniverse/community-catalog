import { useEffect, useState } from 'react'
import { Anchor, Box, Spinner, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import styled from 'styled-components'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import fetchTalkComments from '@src/helpers/talk/fetchTalkComments.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

const StyledLink = styled(Anchor)`
  text-decoration: none;
`

export default function SubjectDiscussion ({
  project, subject
}) {
  const [ status, setStatus ] = useState(READY)
  const [ commentsData, setCommentsData ] = useState([])


  useEffect(function onTargetChange_resetThenFetchData () {
    setStatus(READY)
    setCommentsData([])
    doFetchData(subject)
  }, [project, subject])

  async function doFetchData (subject) {
    if (!subject) return

    try {
      setStatus(FETCHING)
      const comments = await fetchTalkComments(subject)
      setCommentsData(comments)

      setStatus(READY)

    } catch (err) {
      setStatus(ERROR)
      console.error('SubjectDiscussion', err)

    }
  }

  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  const viewOnTalkUrl = project.viewOnTalkUrl?.replace(/{subject_id}/g, subject.id)

  return (
    <Box
      background='light-2'
      className='subject-discussion'
      pad='small'
    >
      <Text size='large'>{strings.components.subject_discussion.title}</Text>
      {(status === READY) && (commentsData.map((comment, index) => {
        return (
          <Box key={index}>Comment {index+1}</Box>
        )
      }))}
      {(status === READY && commentsData.length === 0) && (<Box margin={{ vertical: 'small' }}><Text>{strings.components.subject_discussion.no_results}</Text></Box>)}
      {(status === FETCHING) && (<Box direction='row' justify='center' margin={{ vertical: 'small' }}><Spinner /></Box>)}
      {(status === ERROR) && (<Box margin={{ vertical: 'small' }}><Text color='red' textAlign='center'>{strings.general.error}</Text></Box>)}
      <StyledLink href={viewOnTalkUrl}>
        <Text>{strings.components.subject_discussion.view_on_talk}</Text>
      </StyledLink>
    </Box>

  )
}