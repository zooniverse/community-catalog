import { useState, useEffect } from 'react'
import { base as baseTheme, Box, Grommet, Spinner } from 'grommet'
import { deepMerge } from 'grommet/utils'
import auth from 'panoptes-client/lib/auth'
import zooTheme from '@zooniverse/grommet-theme'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { LAYOUT_MAIN_MAX_WIDTH, NARROW_VIEW_WIDTH } from '@src/config.js'
import strings from '@src/strings.json'
import { AppContext, useStores } from '@src/store'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'

let appTheme = deepMerge(baseTheme, zooTheme)
appTheme = deepMerge(appTheme, {
  global: {
    breakpoints: {
      small: {
        value: NARROW_VIEW_WIDTH
      }
    }
  }
})

const MainBox = styled(Box)`
  width: 100%;
  max-width: ${LAYOUT_MAIN_MAX_WIDTH}px;
  margin: 0 auto;
`  // Limit size on extremely wide screens.

export default function App () {
  const [ initialised, setInitialised ] = useState(false)
  const store = useStores()

  async function checkUser () {
    try {
      const user = await auth.checkCurrent()
      store.setUser(user)
      setInitialised(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(function init () {
    checkUser()
  }, [])

  return (
    <Grommet theme={appTheme}>
      <AppContext.Provider value={store}>
        <Box>
          <Header />
          {(initialised) ?
          <MainBox
            as='main'
          >
            <Outlet />
          </MainBox> :
          <Box
            align='center'
            justify='center'
            pad='small'
          >
            <Spinner
              message={{
                start: strings.messages.app_initialising,
                end: strings.messages.app_ready
              }}
            />
          </Box>
          }
          <Footer />
        </Box>
      </AppContext.Provider>
    </Grommet>
  )
}
