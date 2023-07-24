import { useEffect, useState } from 'react'
import { Anchor, Box, Spinner, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import styled from 'styled-components'

import { ASYNC_STATES } from '@src/config.js'
import strings from '@src/strings.json'
import fetchTalkComments from '@src/helpers/talk/fetchTalkComments.js'
import fetchUsersById from '@src/helpers/talk/fetchUsersById.js'
import fetchTalkRoles from '@src/helpers/talk/fetchTalkRoles.js'

import Comment from './Comment.js'

const { READY, FETCHING, ERROR } = ASYNC_STATES

const CleanLink = styled(Anchor)`
  text-decoration: none;
`

const CommentsContainer = styled(Box)`
  max-height: 480px;
`

const CommentsShadow = styled('div')`
  position: relative;
  height: 40px;
  margin-top: -40px;
  background-image: linear-gradient(to top, #eff2f5, transparent);
`

export default function SubjectDiscussion ({
  project, subject
}) {
  const [ status, setStatus ] = useState(READY)
  const [ commentsData, setCommentsData ] = useState([])
  const [ authors, setAuthors ] = useState(undefined)
  const [ authorRoles, setAuthorRoles ] = useState(undefined)

  useEffect(function onTargetChange_resetThenFetchData () {
    setStatus(READY)
    setCommentsData([])
    setAuthors([])
    setAuthorRoles([])
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

      // Extract author IDs from comments
      let author_ids = comments?.map(comment => comment.user_id)
      author_ids = author_ids?.filter((id, i) => author_ids.indexOf(id) === i)  // Remove duplicates

      // Prepare to identify authors of each comments, and their roles
      const authors = {}  // Lookup dictionary
      const authorRoles = {}  // Lookup dictionary

      // Fetch the User and Roles resources
      const rolesKey = projectId ? { userIds: author_ids, project: projectId } : null
      const [ allUsers, allRoles ] = await Promise.all([
        fetchUsersById(author_ids),
        fetchTalkRoles(rolesKey)
      ])

      allUsers?.forEach(user => {  // Make a dictionary of users...
        authors[user.id] = user
        authorRoles[user.id] = []
      })

      allRoles?.forEach(role => {  // ...and their roles (e.g. admin, team member, etc)
        authorRoles[role.user_id]?.push(role)
      })

      // Done
      setCommentsData(comments)
      setAuthors(authors)
      setAuthorRoles(authorRoles)
      setStatus(READY)

    } catch (err) {
      setStatus(ERROR)
      console.error('SubjectDiscussion', err)

    }
  }

  if (!project || !subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  const viewOnTalkUrl = project.view_on_talk_url?.replace(/{subject_id}/g, subject.id)
  const projectUrl = `/projects/${project?.slug}`

  return (
    <Box
      background='light-1'
      className='subject-discussion'
      pad='small'
    >
      <Text size='large'>{strings.components.subject_discussion.title}</Text>
      {(commentsData.length > 0)
        ? <>
            <CommentsContainer
              overflow='scroll'
              margin={{ vertical: 'xsmall' }}
            >
              {(status === READY) && (commentsData.map(comment => (
                <Comment
                  key={`comment-${comment.id}`}
                  comment={comment}
                  author={authors[comment.user_id]}
                  authorRoles={authorRoles[comment.user_id]}
                  projectUrl={projectUrl}
                />
              )))}
            </CommentsContainer>
            <CommentsShadow />
          </>
        : null
      }
      {(status === READY && commentsData.length === 0) && (<Box margin={{ vertical: 'small' }}><Text>{strings.components.subject_discussion.no_results}</Text></Box>)}
      {(status === FETCHING) && (<Box direction='row' justify='center' margin={{ vertical: 'small' }}><Spinner /></Box>)}
      {(status === ERROR) && (<Box margin={{ vertical: 'small' }}><Text color='red' textAlign='center'>{strings.general.error}</Text></Box>)}
      <CleanLink href={viewOnTalkUrl}>
        <Text>{strings.components.subject_discussion.view_on_talk}</Text>
      </CleanLink>
    </Box>

  )
}