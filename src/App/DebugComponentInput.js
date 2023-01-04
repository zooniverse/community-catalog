import React, { useContext } from 'react'
import { Box, TextInput } from 'grommet'
import { AppContext } from '@src/store'

export default function DebugComponentInput () {
  const store = useContext(AppContext)

  return (
    <Box>
      <TextInput value={store.debug} />
    </Box>
  )
}
