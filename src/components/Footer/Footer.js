import { Footer as GrommetFooter, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'

import strings from '@src/strings.json'

const StyledMarkdown = styled(Markdownz)`
  font-size: 0.75em;
`

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
      <StyledMarkdown>{strings.components.footer}</StyledMarkdown>
    </GrommetFooter>
  )
}
