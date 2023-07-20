import { Box, Image, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'

import { ZOONIVERSE_URL, DEFAULT_AVATAR_URL } from '@src/config.js'
import strings from '@src/strings.json'

export default function Comment ({
  comment,
  author,
  authorRoles = [],
  projectUrl = ZOONIVERSE_URL
}) {
  if (!comment || !author) return null

  const imgSrc = undefined
  const displayName = author.display_name || author.login

  console.log('+++ author: ', author)
  console.log('+++ comment: ', comment)

  return (
    <Box
      background='light-1'
      className='comment'
      direction='row'
      gap='xsmall'
      margin={{ vertical: 'xsmall' }}
      pad='xsmall'
    >
      <Box
        border={{ color: 'orange' }}
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
          {(author.display_name) && <Text weight='bold'>{displayName}</Text>}
          <Text>@{author.login}</Text>
        </Box>
        <Box>
          {authorRoles.map(role => <Text key={`comment-${comment.id}-${role.name}`} size='xsmall'>{role.name}</Text>)}
        </Box>
      </Box>
      <Box border={{ color: 'yellow' }}>
        <Markdownz baseURI={`${projectUrl}`}>{comment.body}</Markdownz>
      </Box>
    </Box>
  )
}