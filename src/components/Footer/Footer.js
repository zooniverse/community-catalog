import { Box, Footer as GrommetFooter } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'

import strings from '@src/strings.json'

const TextBox = styled(Box)`
  max-width: 36.5em;
  
  p {
    font-size: 0.75em;
    text-align: center;
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
      <TextBox pad={{ horizontal: 'medium' }}>
        <Markdownz>{strings.components.footer}</Markdownz>
      </TextBox>
    </GrommetFooter>
  )
}
