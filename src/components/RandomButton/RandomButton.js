/*
Random Button

This is a button that asks the database for a random subject from a project,
then redirects to that Subject page.

It is not, in fact, a randomly created button.
 */

import { useNavigate } from 'react-router-dom';
import { Button } from 'grommet'

import strings from '@src/strings.json'
import getRandomSubject from '@src/helpers/getRandomSubject.js'

export default function RandomButton ({
  project,
  ...rest
}) {
  const navigate = useNavigate()
  if (!project) return null

  async function onClick () {
    const subjectId = await getRandomSubject(project.id)
    if (subjectId) {
      navigate(`/projects/${project.slug}/subject/${subjectId}`)
    } else {
      // TODO
    }
  }

  return (
    <Button
      primary
      label={strings.components.random_button.ready}
      onClick={onClick}
      {...rest}
    />
  )
}
