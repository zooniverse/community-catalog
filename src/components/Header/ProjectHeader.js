import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Heading
} from 'grommet'
import { Share } from 'grommet-icons'
import styled from 'styled-components'

import { ZOONIVERSE_URL } from '@src/config.js'
import strings from '@src/strings.json'

import HeaderSearchForm from './HeaderSearchForm.js'
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

const ProjectIcon = styled('img')`
  background: black;
  width: ${props => props.size} ;
  height: ${props => props.size} ;
  border-radius: ${props => props.size};
`

const headerLinkProps = {
  icon: <Share size='small' color='black' />,
  reverse: true,
  size: 'small',
  target: '_blank',
  weight: 'normal',
}

const ProjectLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`

export default function ProjectHeader ({
  project,
  size,
}) {
  const isNarrowView = size === 'small'

  if (!project) return

  const ProjectControls = (!isNarrowView) ? WideProjectControls : NarrowProjectControls
  const projectURL = `${ZOONIVERSE_URL}/projects/${project?.slug}`
  const talkURL = `${ZOONIVERSE_URL}/projects/${project?.slug}/talk`

  return (
    <Box
      align='center'
      className='project-header'
      direction={isNarrowView ? 'column' : 'row'}
      pad='30px'
      style={{ border: '1px solid cyan', background: '#e0c0e0' }}
      width='100%'
    >
      <ProjectTitle
        project={project}
        size={size}
      />
      <ProjectControls
        project={project}
      >
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
        <HeaderSearchForm project={project} />
      </ProjectControls>
    </Box>
  )
}

function ProjectTitle ({
  project,
  size
}) {
  const isNarrowView = size === 'small'

  if (!project) return null

  const projectAvatarUrl = project?.avatar // TODO: add placeholder

  return (
    <ProjectLink
      keepQuery={false}
      to={`/projects/${project?.slug}`}
    >
      <Box
        align='center'
        className='project-title'
        cssGap={true}
        direction={isNarrowView ? 'column' : 'row'}
        gap='xsmall'
        style={{ border: '1px solid yellow' }}
      >
        <ProjectIcon
          size={isNarrowView ? '40px' : '80px'}
          src={projectAvatarUrl}
          style={{ border: '1px solid green' }}
        />
        <Heading
          size={isNarrowView ? '24px' : '32px'}
          level='1'
          color='white'
          margin='0'
        >
          {project?.name}
        </Heading>
      </Box>
    </ProjectLink>
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
