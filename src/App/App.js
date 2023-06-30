import { useState, useEffect } from 'react'
import { base as baseTheme, Box, Grommet, Spinner } from 'grommet'
import { deepMerge } from 'grommet/utils'
import auth from 'panoptes-client/lib/auth'
import zooTheme from '@zooniverse/grommet-theme'
import { Outlet } from 'react-router-dom'

import strings from '@src/strings.json'
import { AppContext, useStores } from '@src/store'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'

const appTheme = deepMerge(baseTheme, zooTheme)

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
          <Box as='main'>
            <Outlet />
          </Box> :
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
