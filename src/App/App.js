import { useState, useEffect } from 'react'
import { base as baseTheme, Box, Grommet, Heading, Paragraph as P } from 'grommet'
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

            <Box size='small' border={true}>
              <Heading as='h6'>Debug Panel</Heading>
              <P size='small'>{(store.user) ? `Logged in as ${store.user.display_name || store.user.login}` : 'User isn\'t logged in'}</P>
              <Box size='small' as='nav' direction='row'>
                <Link to='/'>Home Page</Link> | <Link to='/search'>Search Page</Link> | <Link to='/subject/12345'>Subject Page</Link>
              </Box>
            </Box>
          </Box> :
          <P>Initialising...</P>
          }
        </Box>
      </AppContext.Provider>
    </Grommet>
  )
}
