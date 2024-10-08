import { useContext } from 'react'
import { Anchor, Box, Footer as GrommetFooter, ResponsiveContext } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'

import strings from '@src/strings.json'
import logoZooniverse from '@src/images/logo-zooniverse-and-partners.png'
import logoScienceMediaMuseum from '@src/images/logo-science-and-media-museum.png'
import logoAhrc from '@src/images/logo-ahrc.png'
import NMSLogo from '@src/images/logo-nms.js'

const TextBox = styled(Box)`
  max-width: 32.5em;
  
  p {
    font-size: 0.75em;
    text-align: center;
  }
`

const LogoBox = styled(Box)`
  img {
    object-fit: contain;
    max-width: 100%;
    margin: 10px;
  }

  svg {
    max-width: 100%;
    margin: 10px;
  }
`

export default function Footer () {
  const size = useContext(ResponsiveContext)
  const isNarrowView = size === 'small'
  return (
    <GrommetFooter
      align='center'
      alignContent='center'
      background='black'
      className='footer'
      direction={(!isNarrowView) ? 'row' : 'column' }
      gap='small'
      pad='small'
      wrap={true}
    >
      <LogoBox
        direction='row'
        flex={true}
        justify='end'
        pad='small'
      >
        <Anchor href="https://www.zooniverse.org">
          <img src={logoZooniverse} height='40px' width='166px' />
        </Anchor>
      </LogoBox>
      <TextBox
        flex={false}
        pad={{ horizontal: 'medium' }}
      >
        <Markdownz>{strings.components.footer}</Markdownz>
      </TextBox>
      <LogoBox
        direction='row'
        flex={true}
        justify='start'
        overflow='hidden'
        pad='small'
        wrap={true}
      >
        <Anchor href="https://www.ukri.org/councils/ahrc/">
          <img
            alt='UKRI Arts and Humanities Research Council logo'
            src={logoAhrc}
            height='40px'
            width='157px'
          />
        </Anchor>
        <Anchor href="https://www.sciencemuseumgroup.org.uk/">
          <img
            alt="Science + Media Museum logo"
            src={logoScienceMediaMuseum}
            height='40px'
            width='40px'
          />
        </Anchor>
        <Anchor href="https://www.nms.ac.uk/">
          <NMSLogo
            alt="National Museums Scotland logo"
            fill='white'
            height={40}
            width={145}
          />
        </Anchor>  
      </LogoBox>
    </GrommetFooter>
  )
}
