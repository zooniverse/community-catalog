import { useEffect, useState } from 'react'
import { Anchor, Box, Spinner, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import styled from 'styled-components'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import fetchTalkComments from '@src/helpers/talk/fetchTalkComments.js'
import fetchUsersById from '@src/helpers/talk/fetchUsersById.js'
import fetchTalkRoles from '@src/helpers/talk/fetchTalkRoles.js'

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
    const projectId = subject?.links?.project

    try {
      // We're fetching a bunch of things, so sit tight
      setStatus(FETCHING)

      // Fetch comments for the subject
      const comments = await fetchTalkComments(subject)
      setCommentsData(comments)

      // Extract author IDs from comments
      let author_ids = comments?.map(comment => comment.user_id)
      author_ids = author_ids?.filter((id, i) => author_ids.indexOf(id) === i)  // Remove duplicates

      // Prepare to identify authors of each comments, and their roles
      const authors = {}
      const authorRoles = {}
      const rolesKey = projectId ? { userIds: author_ids, project: projectId } : null

      const [ allUsers, allRoles ] = await Promise.all([
        fetchUsersById(author_ids),
        fetchTalkRoles(rolesKey)
      ])

      console.log('+++ \nallUsers', allUsers, '\nallRoles', allRoles)

      /*
      const { data: allUsers } = useSWR([author_ids], getUsersByID, SWROptions)
      allUsers?.forEach(user => {
        authors[user.id] = user
        authorRoles[user.id] = []
      })

      const rolesKey = !!subject?.project ? { userIds: author_ids, project: subject.project } : null
      const { data: allRoles } = useSWR(rolesKey, getTalkRoles, SWROptions)
      allRoles?.forEach(role => {
        authorRoles[role.user_id]?.push(role)
      })
      */

      // Done
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