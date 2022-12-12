import React from 'react'
import { base as baseTheme, Box, Grommet, Heading, Paragraph as P } from 'grommet'
import { deepMerge } from 'grommet/utils'
import zooTheme from '@zooniverse/grommet-theme'
import Tester from '@src/App/Tester'

const appTheme = deepMerge(baseTheme, zooTheme)

export default function App () {
  return (
    <Grommet theme={appTheme}>
      <Box>
        <Heading>Zooniverse Community Catalog</Heading>
        <Box as='main'>
          <P>This website is currently being built.</P>
        </Box>
        <Tester />
      </Box>
    </Grommet>
  )
}
