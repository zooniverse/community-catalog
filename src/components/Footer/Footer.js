import { Footer as GrommetFooter, Text } from 'grommet'

import strings from '@src/strings.json'

export default function Footer () {
  return (
    <GrommetFooter
      align='center'
      alignContent='center'
      as='header'
      background='black'
      className='footer'
      direction='column'
      gap='small'
      pad='small'
      wrap={true}
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
