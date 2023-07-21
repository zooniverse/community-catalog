import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Heading,
  ResponsiveContext,
  Text,
  TextInput
} from 'grommet'
import { Search, Share, FormClose as DeleteIcon } from 'grommet-icons'

import Link from '@src/components/Link'
import { ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { ZOONIVERSE_URL } from '@src/config.js'
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
  const queryFromUrl = getQuery() || ''
  const [ query, setQuery ] = useState(queryFromUrl)
  const location = useLocation()

  useEffect(function onUrlChange_getQueryFromUrl () {
    setQuery(queryFromUrl)
  }, [ location ])

  if (!project) return (
    <Box
      {...containerProps}
      className='header'
      direction={(!isNarrowView) ? 'row' : 'column'}
    >
      <HeaderLogoAndTitle />
    </Box>
  )

  const ProjectControls = (!isNarrowView) ? WideProjectControls : NarrowProjectControls
  const projectURL = `${ZOONIVERSE_URL}/projects/${project?.slug}`
  const talkURL = `${ZOONIVERSE_URL}/projects/${project?.slug}/talk`

  return (
    <Box
      {...containerProps}
      className='header'
      direction={(!isNarrowView) ? 'row' : 'column'}
    >
      <HeaderLogoAndTitle />
      <ProjectControls
        project={project}
        env={env}
        query={query}
        setQuery={setQuery}
      >
        {(isNarrowView)
          ? <ProjectLink
              to={`/projects/${project?.slug}`}
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
          : null
        }
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
          action={`/projects/${project?.slug}/search`}
          method='get'
        >
          <Box
            background='white'
            direction='row'
            pad='11.5px'
          >
            <HeaderSearchInput
              name='query'
              icon={<Search color='black' size='small' />}
              value={query}
              onChange={e => setQuery(e?.target?.value)}
              width={{ min: 'medium', max: 'xlarge' }}
              plain='full'
            />
            <Button plain icon={<DeleteIcon size='small' a11yTitle={strings.components.header.clear_query} />} onClick={e => setQuery('')} />
          </Box>
          {(env)
            ? <input name='env' value={env} type='hidden' />
            : null
          }
        </HeaderSearchForm>
      </ProjectControls>
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
  children,
}) {
  return (
    <Box
      direction='row'
      flex='grow'
      gap='small'
    >
      <Box flex='grow' />
      {children}
    </Box>
  )
}

function NarrowProjectControls ({
  children,
}) {
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
          {children}
        </Box>
      </AccordionPanel>
    </Accordion>
  )
}

export default observer(Header)
