/*
Random Button

This is a button that asks the database for a random subject from a project,
then redirects to that Subject page.

It is not, in fact, a randomly created button.
 */

import { Button } from 'grommet'

import strings from '@src/strings.json'

export default function RandomButton ({
  project,
  ...rest
}) {
  if (!project) return null

  return (
    <Button
      primary
      label={strings.components.random_button.ready}
      {...rest}
    />
  )
}
