import React, { useContext } from 'react'
import { Box, TextInput } from 'grommet'
import { AppContext } from '@src/store'

export default function DebugComponentInput () {
  const { debugText, setDebugText } = useContext(AppContext)

  console.log('update')

  return (
    <Box>
      <TextInput
        value={debugText}
        onChange={(e) => {
          setDebugText(e.target.value)
        }}
      />
    </Box>
  )
}
