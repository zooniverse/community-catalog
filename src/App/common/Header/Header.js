import React from 'react'
import { Anchor, Box, Text, TextInput } from 'grommet'
import { ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'

const HeaderTitle = styled(Text)`
  text-transform: uppercase;
`

const HeaderLink = styled(Anchor)`
  background: #ffffff;
  color: #000000;
  width: 24em;
  padding: 1em;
`

export default function Header () {
  return (
    <Box
      align='center'
      alignContent='center'
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
        <HeaderTitle textAlign='center'>Communities &amp; Crowds</HeaderTitle>
      </Box>
      <HeaderLink
        label='Project Home Page'
        href='https://www.zooniverse.org'
        size='small'
      />
      <HeaderLink
        label='Talk Board'
        href='https://www.zooniverse.org/talk'
        size='small'
      />
      <TextInput
        
      />
    </Box>
  )
}
