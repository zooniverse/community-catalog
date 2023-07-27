import { Box, Image, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'

import { ZOONIVERSE_URL, DEFAULT_AVATAR_URL } from '@src/config.js'
import strings from '@src/strings.json'

const CommentBox = styled(Box)`
  ${props => props.isDeleted ? 'opacity: 0.25;' : '' }
`

export default function Comment ({
  comment,
  author,
  authorRoles = [],
  projectUrl = ZOONIVERSE_URL
}) {
  if (!comment || !author) return null

  const imgSrc = author.avatar_src || DEFAULT_AVATAR_URL
  const displayName = author.display_name || author.login
  const timestamp = new Date(author.created_at).toLocaleString()
  const isDeleted = !!comment.is_deleted

  return (
    <CommentBox
      flex={false}
      background='white'
      className='comment'
      direction='row'
      gap='xsmall'
      isDeleted={isDeleted}
      margin={{ vertical: 'xsmall' }}
      pad='xsmall'
    >
      <Box
        flex={false}
        direction='column'
        width='120px'
        justify='start'
      >
        <Image
          alt={strings.components.subject_discussion.user_avatar.replace(/{username}/g, displayName)}
          alignSelf='center'
          src={imgSrc}
          fallback={DEFAULT_AVATAR_URL}
          width='80px'
        />
        <Box>
          {(author.display_name) && <Text weight='bold' size='small'>{displayName}</Text>}
          <Text size='small'>@{author.login}</Text>
        </Box>
        <Box direction='row' wrap={true}>
          {authorRoles.map(role =>
            <Text
              color='dark-2'
              key={`comment-${comment.id}-${role.name}`}
              size='xsmall'
              margin={{ right: '0.25em' }}
            >
              {role.name}
            </Text>
          )}
        </Box>
      </Box>
      <Box
        flex={true}
        margin={(comment.body?.trim().length > 0) ? { top: '-1em' } : null}
      >  {/* Add negative margin because Markdownz's first paragraph will always have margin top/bottom 1em, causing a mis-alignment of text and the avatar icon. */}
        <Markdownz baseURI={`${projectUrl}`}>{comment.body}</Markdownz>
        <Box flex={true} />
        <Box direction='row' justify='end'>
          <Text size='xsmall'>{timestamp}</Text>
        </Box>

      </Box>
    </CommentBox>
  )
}