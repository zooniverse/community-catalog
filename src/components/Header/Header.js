import { Anchor, Box, Text, TextInput } from 'grommet'
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

const HeaderLogoAndTitle = styled(Box)`
  margin-right: 4em;
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

function Header () {
  const { project } = useStores()
  const projectSlug = project?.slug || ''
  const projectURL = `https://www.zooniverse.org/projects/${projectSlug}`
  const talkURL = `https://www.zooniverse.org/projects/${projectSlug}/talk`
  const env = getEnv()

  if (!project) return (
    <Box
      align='center'
      alignContent='center'
      as='header'
      background='black'
      direction='row'
      gap='small'
      pad='small'
      wrap={true}
    >
      <LogoLink
        to={`/`}
      >
        <HeaderLogoAndTitle
          align='center'
          flex={false}
          width='xsmall'
        >
          <ZooniverseLogo id='header-zooniverseLogo' size='3em' style={{ color: '#00979d' }} />
          <HeaderTitle textAlign='center' size='xsmall'>{strings.general.app_name}</HeaderTitle>
        </HeaderLogoAndTitle>
      </LogoLink>
    </Box>
  )

  return (
    <Box
      align='center'
      alignContent='center'
      as='header'
      background='black'
      direction='row'
      gap='small'
      pad='small'
      wrap={true}
    >
      <LogoLink
        to={`/`}
      >
        <HeaderLogoAndTitle
          align='center'
          flex={false}
          width='xsmall'
        >
          <ZooniverseLogo id='header-zooniverseLogo' size='3em' style={{ color: '#00979d' }} />
          <HeaderTitle textAlign='center' size='xsmall'>{strings.general.app_name}</HeaderTitle>
        </HeaderLogoAndTitle>
      </LogoLink>
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

export default observer(Header)
