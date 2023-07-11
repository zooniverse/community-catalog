import { useContext } from 'react'
import { Anchor, Box, ResponsiveContext, Text, TextInput } from 'grommet'
import { Search, Share } from 'grommet-icons'
import { Link } from 'react-router-dom'
import { ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import getEnv from '@src/helpers/getEnv.js'

const LogoLink = styled(Link)`
  color: #e2e5e9;
  text-decoration: none;
`

const HeaderTitle = styled(Text)`
  text-transform: uppercase;
`

const HeaderLink = styled(Anchor)`
  background: white;
  color: black;
  flex: 0 0 auto;
  padding: 1em;
  text-align: center;
  width: 13em;
`

const HeaderSearchForm = styled('form')`
  margin: 0;
`

const HeaderSearchInput = styled(TextInput)`
  background: white;
  color: black;
`

const containerProps = {
  align: 'center',
  alignContent: 'center',
  as: 'header',
  background: 'black',
  direction: 'row',
  gap: 'small',
  pad: 'small',
  wrap: true,
}

function Header () {
  const { project } = useStores()
  const projectSlug = project?.slug || ''
  const projectURL = `https://www.zooniverse.org/projects/${projectSlug}`
  const talkURL = `https://www.zooniverse.org/projects/${projectSlug}/talk`
  const env = getEnv()
  const size = useContext(ResponsiveContext)

  if (!project) return (
    <Box
      {...containerProps}
    >
      <HeaderLogoAndTitle />
    </Box>
  )

  return (
    <Box
      {...containerProps}
    >
      <HeaderLogoAndTitle />
      <Box flex='grow' />
      <HeaderLink
        icon={<Share size='small' />}
        label='Project Home Page'
        href={projectURL}
        reverse={true}
        size='small'
        target='_blank'
        weight='normal'
      />
      <HeaderLink
        icon={<Share size='small' />}
        label='Talk Board'
        href={talkURL}
        reverse={true}
        size='small'
        target='_blank'
        weight='normal'
      />
      <HeaderSearchForm
        action={`/projects/${projectSlug}/search`}
        method='get'
      >
        <HeaderSearchInput
          name='query'
          icon={<Search size='small' />}
        />
        {(env)
          ? <input name='env' value={env} type='hidden' />
          : null
        }
      </HeaderSearchForm>
    </Box>
  )
}

function HeaderLogoAndTitle () {
  return (
    <LogoLink
      to={`/`}
    >
      <Box
        align='center'
        flex={false}
        width='xsmall'
      >
        <ZooniverseLogo id='header-zooniverseLogo' size='3em' style={{ color: '#00979d' }} />
        <HeaderTitle textAlign='center' size='xsmall'>{strings.general.app_name}</HeaderTitle>
      </Box>
    </LogoLink>
  )
}

export default observer(Header)
