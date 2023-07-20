import { Box, Text } from 'grommet'

export default function Comment ({
  comment,
  author,
  authorRoles = []
}) {
  if (!comment || !author) return null

  return (
    <Box
      background='light-2'
    >
      {comment.body}
    </Box>
  )
}