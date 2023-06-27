import { Box, Table, TableBody, TableCell, TableRow, Text } from 'grommet'
import styled from 'styled-components'

import fetchKeywords from '@src/helpers/fetchKeywords'
import Link from '@src/components/Link'

const KeywordLink = styled(Link)`
  text-decoration: none;
`

export default function SubjectMetadata ({
  subject = undefined,
}) {
  const metadata = (subject?.metadata)
    ? Object.entries(subject.metadata)
      .map(m => ({ key: m[0], value: m[1] }))
      .filter(m => !m.key.startsWith('#'))
    : []

  return (
    <Box
      align='start'
    >
      <Text margin={{ bottom: 'small' }}>
        INSTITUTIONAL METADATA:
      </Text>
      <Table>
        <TableBody>
          {metadata.map((m, i) => (
            <TableRow key={`subject-metadata-${i}`}>
              <TableCell>
                <strong>{m.key}</strong>
              </TableCell>
              <TableCell>
                {m.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Text color='drawing-pink'>(Should this be pulled from Panoptes or aux database?)</Text>
    </Box>
  )
}
