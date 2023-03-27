import React from 'react'
import { Anchor, Box, Text, TextInput } from 'grommet'
import { Search, Share } from 'grommet-icons'
import { ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'

const HeaderLogoAndTitle = styled(Box)`
  margin-right: 4em;
`

const HeaderTitle = styled(Text)`
  text-transform: uppercase;
`

const HeaderLink = styled(Anchor)`
  background: #ffffff;
  color: #000000;
  flex: 0 0 auto;
  padding: 1em;
  text-align: center;
  width: 13em;
`

const HeaderSearchForm = styled('form')`
  margin: 0;
`

const HeaderSearchInput = styled(TextInput)`
  background: #ffffff;
  color: #000000;
`

export default function Header () {
  return (
    <Box
      align='center'
      alignContent='center'
      as='header'
      background='#000000'
      direction='row'
      gap='small'
      pad='small'
      wrap={true}
    >
      <HeaderLogoAndTitle
        align='center'
        flex={false}
        width='xsmall'
      >
        <ZooniverseLogo id='header-zooniverseLogo' size='3em' style={{ color: '#00979d' }} />
        <HeaderTitle textAlign='center' size='xsmall'>Communities &amp; Crowds</HeaderTitle>
      </HeaderLogoAndTitle>
      <HeaderLink
        icon={<Share size='small' />}
        label='Project Home Page'
        href='https://www.zooniverse.org'
        reverse={true}
        size='small'
        target='_blank'
        weight='normal'
      />
      <HeaderLink
        icon={<Share size='small' />}
        label='Talk Board'
        href='https://www.zooniverse.org/talk'
        reverse={true}
        size='small'
        target='_blank'
        weight='normal'
      />
      
      <HeaderSearchForm
        action='/search'
        method='get'
      >
        <HeaderSearchInput
          name='query'
          icon={<Search size='small' />}
        />
      </HeaderSearchForm>
    </Box>
  )
}
