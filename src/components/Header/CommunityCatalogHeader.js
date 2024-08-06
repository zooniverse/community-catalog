import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { ZooniverseLogo } from '@zooniverse/react-components'

import strings from '@src/strings.json'
import Link from '@src/components/Link'
import wordZooniverse from '@src/images/zooniverse-word-white.png'

const LogoLink = styled(Link)`
  color: #e2e5e9;
  text-decoration: none;
`

// Header title is styled very specifically so it looks like...
//   Communities (\line break)
//   & Crowds
const HeaderTitle = styled(Text)`
  font-size: 14px;
  line-height: 14.5px;
  max-width: 100px;
  text-transform: uppercase;
`

const ZooniverseWordImage = styled('img')`
  height: 24px;
`

export default function CommunityCatalogHeader ({
  size
}) {
  const isNarrowView = size === 'small'

  return (
    <Box
      align='center'
      className='community-catalog-header'
      direction='row'
      pad='30px'
      width='100%'
    >
      <LogoLink
        keepQuery={false}
        to={`/`}
      >
        <Box align='center' direction='row' gap='small'>
          <ZooniverseLogo id='header-zooniverseLogo' size='24px' style={{ color: '#00979d' }} />
          {!isNarrowView && <ZooniverseWordImage alt={strings.general.zooniverse_name} src={wordZooniverse} />}
          <HeaderTitle color='white'>{strings.general.app_name}</HeaderTitle>
        </Box>
      </LogoLink>
      {/* WIP: hide sign in button until auth is implemented
      <Box flex='grow' />
      <Box>
        <Button label='Sign In' />
      </Box>
      */}
    </Box>
  )
}