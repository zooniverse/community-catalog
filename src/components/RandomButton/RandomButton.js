import { Button } from 'grommet'

import strings from '@src/strings.json'

export default function RandomButton ({
  projectId,
  ...rest
}) {
  if (!projectId) return null

  return (
    <Button
      primary
      label={strings.components.random_button.ready}
      {...rest}
    />
  )
}
