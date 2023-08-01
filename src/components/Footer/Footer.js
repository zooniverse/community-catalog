import { Box, Footer as GrommetFooter, Image } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'

import strings from '@src/strings.json'
import logoZooniverse from '@src/images/logo-zooniverse-and-partners.png'
import logoScienceMediaMuseum from '@src/images/logo-science-and-media-museum.png'
import logoAhrc from '@src/images/logo-ahrc.png'

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
      direction='row'
      gap='small'
      pad='small'
      wrap={true}
    >
      <Box
        flex={true}
        width='small'
      >
        <Image src={logoZooniverse} height='small' />
      </Box>
      <TextBox
        flex={false}
        pad={{ horizontal: 'medium' }}
      >
        <Markdownz>{strings.components.footer}</Markdownz>
      </TextBox>
      <Box
        flex={true}
        width='small'
      >
        <Image src={logoAhrc} height='small' />
        <Image src={logoScienceMediaMuseum} height='small' />
      </Box>
    </GrommetFooter>
  )
}
