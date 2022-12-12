import React, { useState } from 'react'
import { Box, Button, Paragraph as P, TextInput } from 'grommet'
import { talkAPI } from '@zooniverse/panoptes-js'

export default function Tester () {
  const [ query, setQuery ] = useState('')

  function textQuery_onChange (e) {
    setQuery(e.target.value)
  }

  function buttonSubmit_onClick (e) {
    console.log(query)
  }

  return (
    <Box>
      <P>Tester Component</P>
      <TextInput className='text-query' onChange={textQuery_onChange} value={query} placeholder='Type in a query' />
      <Button className='button-submit' primary label='Submit' onClick={buttonSubmit_onClick} />
    </Box>
  )
}
