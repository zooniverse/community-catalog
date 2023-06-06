import { Anchor, Box, Text, TextInput } from 'grommet'
import { Search, Share } from 'grommet-icons'
import { ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'

const HeaderLogoAndTitle = styled(Box)`
  margin-right: 4em;
`

const HeaderTitle = styled(Text)`
  text-transform: uppercase;
`

const HeaderLink = styled(Anchor)`
  background: white;
  color: black;
  flex: 0 0 auto;
  padding: 1em;
  text-align: center;
  width: 13em;
`

const HeaderSearchForm = styled('form')`
  margin: 0;
`

const HeaderSearchInput = styled(TextInput)`
  background: white;
  color: black;
`

function Header () {
  const store = useStores()
  const projectSlug = store.project?.slug || ''

  return (
    <Box
      align='center'
      alignContent='center'
      as='header'
      background='black'
      direction='row'
      gap='small'
      pad='small'
      wrap={true}
    >
      <HeaderLogoAndTitle
        align='center'
        flex={false}
        width='xsmall'
      >
        <ZooniverseLogo id='header-zooniverseLogo' size='3em' style={{ color: '#00979d' }} />
        <HeaderTitle textAlign='center' size='xsmall'>Communities &amp; Crowds</HeaderTitle>
      </HeaderLogoAndTitle>
      <HeaderLink
        icon={<Share size='small' />}
        label='Project Home Page'
        href='https://www.zooniverse.org'
        reverse={true}
        size='small'
        target='_blank'
        weight='normal'
      />
      <HeaderLink
        icon={<Share size='small' />}
        label='Talk Board'
        href='https://www.zooniverse.org/talk'
        reverse={true}
        size='small'
        target='_blank'
        weight='normal'
      />

      {store.project && (
        <HeaderSearchForm
          action={`/projects/${projectSlug}/search`}
          method='get'
        >
          <HeaderSearchInput
            name='query'
            icon={<Search size='small' />}
          />
        </HeaderSearchForm>
      )}
    </Box>
  )
}

export default observer(Header)
