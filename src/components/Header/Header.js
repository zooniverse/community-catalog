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
import getQuery from '@src/helpers/getQuery.js'

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
  max-width: 11em;
  width: 100%;
`

const headerLinkProps = {
  icon: <Share size='small' color='black' />,
  reverse: true,
  size: 'small',
  target: '_blank',
  weight: 'normal',
}

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

function Header () {
  const { project } = useStores()
  const env = getEnv()
  const size = useContext(ResponsiveContext)
  const isNarrowView = size === 'small'
  const defaultQuery = getQuery() || ''
  const [ query, setQuery ] = useState(defaultQuery)

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
        ? <WideProjectControls
            project={project}
            env={env}
            query={query}
            setQuery={setQuery}
          />
        : <NarrowProjectControls
            project={project}
            env={env}
            query={query}
            setQuery={setQuery}
          />
      }
      {(!isNarrowView)
        ? <ProjectLink to={`/projects/${project?.slug}`}>
            <Heading
              size='1.1em'
              level='1'
              color='light-1'
              margin={{ bottom: '0' }}
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
  env,
  query = '',
  setQuery = () => {},
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
        label={strings.components.header.project_button}
        href={projectURL}
      />
      <HeaderLink
        {...headerLinkProps}
        label={strings.components.header.talk_button}
        href={talkURL}
      />
      <HeaderSearchForm
        action={`/projects/${projectSlug}/search`}
        method='get'
      >
        <HeaderSearchInput
          name='query'
          icon={<Search color='black' size='small' />}
          value={query}
          onChange={e => setQuery(e?.target?.value)}
          width={{ min: 'medium', max: 'xlarge' }}
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
  env,
  query = '',
  setQuery = () => {},
}) {
  const projectSlug = project?.slug || ''
  const projectURL = `https://www.zooniverse.org/projects/${projectSlug}`
  const talkURL = `https://www.zooniverse.org/projects/${projectSlug}/talk`

  return (
    <Accordion
      flex='grow'
      width='100%'
    >
      <AccordionPanel label={strings.components.header.narrow_view_menu}>
        <Box
          direction='column'
          gap='small'
        >
          <ProjectLink
            to={`/projects/${projectSlug}`}
          >
            <Heading
              size='1.1em'
              level='1'
              color='light-1'
              margin={{ bottom: '0' }}
            >
              {project?.name}
            </Heading>
          </ProjectLink>
          <HeaderLink
            {...headerLinkProps}
            label={strings.components.header.project_button}
            href={projectURL}
          />
          <HeaderLink
            {...headerLinkProps}
            label={strings.components.header.talk_button}
            href={talkURL}
          />
          <HeaderSearchForm
            action={`/projects/${projectSlug}/search`}
            method='get'
          >
            <HeaderSearchInput
              name='query'
              icon={<Search size='small' />}
              value={query}
              onChange={e => setQuery(e?.target?.value)}
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
