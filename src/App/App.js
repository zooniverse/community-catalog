import { useState, useEffect } from 'react'
import { base as baseTheme, Box, Grommet, Spinner } from 'grommet'
import { deepMerge } from 'grommet/utils'
import auth from 'panoptes-client/lib/auth'
import zooTheme from '@zooniverse/grommet-theme'
import { Link, Outlet } from 'react-router-dom'

import { AppContext, useStores } from '@src/store'
import Header from '@src/components/Header'

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
                start: 'Initialising app...',
                end: 'App ready',
              }}
            />
          </Box>
          }
        </Box>
      </AppContext.Provider>
    </Grommet>
  )
}
