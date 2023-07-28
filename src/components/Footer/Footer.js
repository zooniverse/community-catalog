import { Footer as _GrommetFooter, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'

import strings from '@src/strings.json'

const GrommetFooter = styled(_GrommetFooter)`
  p {
    font-size: 0.75em;
  }
`

export default function Footer () {
  return (
    <GrommetFooter
      align='center'
      alignContent='center'
      background='black'
      className='footer'
      direction='column'
      gap='small'
      pad='small'
      wrap={true}
    >
      <Markdownz>{strings.components.footer}</Markdownz>
    </GrommetFooter>
  )
}
