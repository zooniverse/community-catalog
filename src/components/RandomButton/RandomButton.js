/*
Random Button

This is a button that asks the database for a random subject from a project,
then redirects to that Subject page.

It is not, in fact, a randomly created button.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'grommet'
import styled from 'styled-components'
import { ZooniverseLogo } from '@zooniverse/react-components'

import strings from '@src/strings.json'
import fetchRandomSubjects from '@src/helpers/fetchRandomSubjects.js'
import getEnv from '@src/helpers/getEnv.js'

const StyledButton = styled(Button)`
  border-radius: 1em;
  ${props => props?.headerVariant ? 'width: 200px;' : ''}
`

export default function RandomButton ({
  project,
  headerVariant = false,
  ...rest
}) {
  const [ isWorking, setIsWorking ] = useState(false)
  const [ message, setMessage ] = useState(strings.components.random_button.ready)
  const navigate = useNavigate()
  
  async function onClick () {
    try {
      setIsWorking(true)
      setMessage(strings.components.random_button.working)  // NOTE: Button.busy may make the "working" message unnecessary

      const subjects = await fetchRandomSubjects(project.id, 1)
      const subjectId = subjects?.[0]
      if (subjectId) {
        setIsWorking(false)
        setMessage(strings.components.random_button.ready)
        const env = getEnv()
        navigate(`/projects/${project.slug}/subject/${subjectId}${
          (env) ? `?env=${encodeURIComponent(env)}` : ''
        }`)
      } else {
        throw new Error ('No Subjects available, apparently. Check database table isn\'t empty.')
      }
    } catch (err) {
      console.error('<RandomButton>', err)
      setIsWorking(false)
      setMessage(strings.components.random_button.error)
    }
  }

  if (!project) return null

  return (
    <StyledButton
      color='#005D69'
      className='random-button'
      headerVariant={headerVariant}
      icon={headerVariant ? <ZooniverseLogo /> : null}
      gap={headerVariant ? '6px' : null}
      primary
      busy={isWorking}
      disabled={isWorking}
      label={message}
      onClick={onClick}
      {...rest}
    />
  )
}
