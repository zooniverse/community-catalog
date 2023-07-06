import { Box, Table, TableBody, TableCell, TableRow, Text } from 'grommet'
import styled from 'styled-components'

import strings from '@src/strings.json'
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
        {strings.components.subject_metadata.institutional_metadata}
      </Text>
      <Box>
        {metadata.map((m, i) => (
          <Box
            key={`subject-metadata-${i}`}
            direction='row'
            margin={{ bottom: 'xsmall' }}
          >
            <Text
              weight='bold'
              margin={{ right: 'small' }}
            >
              {m.key}
            </Text>
            <Text>
              {m.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )

  /* Table version
  return (
    <Box
      align='start'
    >
      <Text margin={{ bottom: 'small' }}>
        {strings.components.subject_metadata.institutional_metadata}
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
    </Box>
  )
  */
}
