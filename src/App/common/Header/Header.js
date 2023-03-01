import React from 'react'
import { Box, Button, Text, TextInput } from 'grommet'
import { ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'

const HeaderText = styled(Text)`
  text-transform: uppercase;
`

export default function Header () {
  return (
    <Box
      as='header'
      background='dark-1'
      direction='row'
      gap='small'
      pad='small'
    >
      <Box
        align='center'
        flex='false'
        width='xsmall'
      >
        <ZooniverseLogo size='4em' style={{ color: '#00979d' }} />
        <HeaderText textAlign='center'>Communities &amp; Crowds</HeaderText>
      </Box>
      <Button
        background='light-1'
        label='Project Home Page'
        href='https://www.zooniverse.org'
      />
      <Button
       background='light-1'
        label='Project Home Page'
        href='https://www.zooniverse.org'
      />
      <TextInput
        
      />
    </Box>
  )
}
