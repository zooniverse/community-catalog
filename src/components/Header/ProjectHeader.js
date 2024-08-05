import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Heading,
  TextInput
} from 'grommet'
import { Search, Share, FormClose as DeleteIcon } from 'grommet-icons'
import styled from 'styled-components'

import { ZOONIVERSE_URL } from '@src/config.js'
import strings from '@src/strings.json'
import getEnv from '@src/helpers/getEnv.js'
import getQuery from '@src/helpers/getQuery.js'

import Link from '@src/components/Link'

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

export default function ProjectHeader ({
  project,
  size,
}) {
  const env = getEnv()
  const queryFromUrl = getQuery() || ''
  const [ query, setQuery ] = useState(queryFromUrl)
  const location = useLocation()
  const isNarrowView = size === 'small'

  useEffect(function onUrlChange_getQueryFromUrl () {
    setQuery(queryFromUrl)
  }, [ location ])

  if (!project) return

  const ProjectControls = (!isNarrowView) ? WideProjectControls : NarrowProjectControls
  const projectURL = `${ZOONIVERSE_URL}/projects/${project?.slug}`
  const talkURL = `${ZOONIVERSE_URL}/projects/${project?.slug}/talk`

  return (
    <Box
      className='project-header'
      style={{ border: '1px solid cyan' }}
      width='100%'
    >
      <ProjectControls
        project={project}
        env={env}
        query={query}
        setQuery={setQuery}
      >
        {(isNarrowView)
          ? <ProjectLink
              keepQuery={false}
              to={`/projects/${project?.slug}`}
            >
              <Heading
                size='1.1em'
                level='1'
                color='white'
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
        ? <ProjectLink
            keepQuery={false}
            to={`/projects/${project?.slug}`}
          >
            <Heading
              size='1.1em'
              level='1'
              color='white'
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
