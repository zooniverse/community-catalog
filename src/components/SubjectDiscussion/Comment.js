import { Box, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'

import { ZOONIVERSE_URL } from '@src/config.js'

export default function Comment ({
  comment,
  author,
  authorRoles = [],
  projectUrl = ZOONIVERSE_URL
}) {
  if (!comment || !author) return null

  console.log('+++ author: ', author)
  console.log('+++ roles: ', authorRoles)

  return (
    <Box
      background='light-2'
    >
      <Text>{author.display_name}</Text>
      {authorRoles.map(role => <Text key={`comment-${comment.id}-${role.name}`}>{role.name}</Text>)}
      <Markdownz baseURI={`${projectUrl}`}>{comment.body}</Markdownz>
    </Box>
  )
}