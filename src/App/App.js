import React, { useState, useEffect } from 'react'
import { base as baseTheme, Box, Grommet, Heading, Paragraph as P } from 'grommet'
import { deepMerge } from 'grommet/utils'
import auth from 'panoptes-client/lib/auth'
import zooTheme from '@zooniverse/grommet-theme'
import { Outlet } from 'react-router-dom'

import { AppContext, initAppStore } from '@src/store'
import Header from '@src/App/common/Header'

const appTheme = deepMerge(baseTheme, zooTheme)

export default function App () {
  const store = initAppStore()

  async function checkUser () {
    try {
      const user = await auth.checkCurrent()
      store.setUser(user)
      store.setInitialised(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(function init () {
    checkUser()
  }, [])

  console.log('+++ appTheme: ', appTheme)

  return (
    <Grommet theme={appTheme}>
      <AppContext.Provider value={store}>
        <Box>
          <Header />
          {(store.initialised) ?
          <Box as='main'>
            <Outlet />

            <Box size='small' border={true}>
              <P size='small'>{(store.user) ? `Logged in as ${store.user.display_name || store.user.login}` : 'User isn\'t logged in'}</P>
            </Box>
          </Box> :
          <P>Loading...</P>
          }
        </Box>
      </AppContext.Provider>
    </Grommet>
  )
}
