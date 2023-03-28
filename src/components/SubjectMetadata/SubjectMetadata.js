import React, { useEffect, useState } from 'react'
import { Box, Table, TableCell, TableRow, Text } from 'grommet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import fetchKeywords from '@src/helpers/fetchKeywords'

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
        {metadata.map(m => (
          <TableRow>
            <TableCell>
              <strong>{m.key}</strong>
            </TableCell>
            <TableCell>
              {m.value}
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Text color='drawing-pink'>(Should this be pulled from Panoptes or aux database?)</Text>
    </Box>
  )
}
