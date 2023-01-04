import React, { useState, useEffect } from 'react'
import { base as baseTheme, Box, Grommet, Heading, Paragraph as P } from 'grommet'
import { deepMerge } from 'grommet/utils'
import auth from 'panoptes-client/lib/auth'
import zooTheme from '@zooniverse/grommet-theme'
import { config } from '@src/config.js'
import { AppContext, AppStore } from '@src/store'

import Tester from '@src/App/Tester'
import DebugComponentInput from '@src/App/DebugComponentInput.js'

const appTheme = deepMerge(baseTheme, zooTheme)

export default function App () {

  async function checkUser () {
    try {
      const user = await auth.checkCurrent()
      console.log('+++ user: ', user)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(function init () {
    checkUser()
  }, [])

  return (
    <Grommet theme={appTheme}>
      <AppContext.Provider value={AppStore}>
        <Box>
          <Heading>Zooniverse Community Catalog</Heading>
          <Box as='main'>
            <P>This website is currently being built.</P>
          </Box>
          <Tester />
          <DebugComponentInput />
        </Box>
      </AppContext.Provider>
    </Grommet>
  )
}
