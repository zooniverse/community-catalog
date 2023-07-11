import { useContext, useState } from 'react'
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Heading,
  ResponsiveContext,
  Text,
  TextInput
} from 'grommet'
import { Search, Share } from 'grommet-icons'
import Link from '@src/components/Link'
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

const ProjectLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`

const containerProps = {
  align: 'center',
  alignContent: 'center',
  as: 'header',
  background: 'black',
  direction: 'row',
  pad: 'small',
  wrap: true,
}

const headerLinkProps = {
  icon: <Share size='small' />,
  reverse: true,
  size: 'small',
  target: '_blank',
  weight: 'normal',
  
}

function Header () {
  const { project } = useStores()
  const env = getEnv()
  const size = useContext(ResponsiveContext)
  const isNarrowView = size === 'small'

  if (!project) return (
    <Box
      {...containerProps}
      direction={(!isNarrowView) ? 'row' : 'column'}
    >
      <HeaderLogoAndTitle />
    </Box>
  )

  return (
    <Box
      {...containerProps}
      direction={(!isNarrowView) ? 'row' : 'column'}
    >
      <HeaderLogoAndTitle />
      {(!isNarrowView)
        ? <WideProjectControls project={project} env={env} />
        : <NarrowProjectControls
            project={project}
            env={env}
          />
      }
      {(!isNarrowView)
        ? <ProjectLink to={`/projects/${project?.slug}`}>
            <Heading
              level='1'
              color='light-1'
            >
              {project?.name}
            </Heading>
          </ProjectLink>
        : null
      }
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

function WideProjectControls ({
  project,
  env
}) {
  const projectSlug = project?.slug || ''
  const projectURL = `https://www.zooniverse.org/projects/${projectSlug}`
  const talkURL = `https://www.zooniverse.org/projects/${projectSlug}/talk`
  
  return (
    <Box
      direction='row'
      flex='grow'
      gap='small'
    >
      <Box flex='grow' />
      <HeaderLink
        {...headerLinkProps}
        label='Project Home Page'
        href={projectURL}
      />
      <HeaderLink
        {...headerLinkProps}
        label='Talk Board'
        href={talkURL}
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

function NarrowProjectControls ({
  project,
  env
}) {
  const projectSlug = project?.slug || ''
  const projectURL = `https://www.zooniverse.org/projects/${projectSlug}`
  const talkURL = `https://www.zooniverse.org/projects/${projectSlug}/talk`

  return (
    <Accordion
      flex='grow'
    >
      <AccordionPanel label={project?.name || strings.components.header.narrow_view_menu}>
        <Box
          direction='column'
          gap='small'
        >
          <Link          
            to={`/projects/${projectSlug}`}
          >
            <Text color='light-1'>Home</Text>
          </Link>
          <HeaderLink
            {...headerLinkProps}
            label='Project Home Page'
            href={projectURL}
          />
          <HeaderLink
            {...headerLinkProps}
            label='Talk Board'
            href={talkURL}
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
      </AccordionPanel>
    </Accordion>
  )
}

export default observer(Header)
