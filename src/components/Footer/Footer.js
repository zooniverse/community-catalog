import { Footer as GrommetFooter, Text } from 'grommet'

import strings from '@src/strings.json'

export default function Footer () {
  return (
    <GrommetFooter
      pad='small'
      direction='column'
    >
      <Text
        size='small'
        textAlign='center'
      >
        {strings.components.footer}
      </Text>
    </GrommetFooter>
  )
}
