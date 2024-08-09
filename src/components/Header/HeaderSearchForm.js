import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Button, TextInput } from 'grommet'
import { Search, FormClose as DeleteIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'
import getEnv from '@src/helpers/getEnv.js'
import getQuery from '@src/helpers/getQuery.js'

const StyledForm = styled('form')`
  flex: 1 0 200px;
  margin: 0;

  @media (min-width: 600px) {
    max-width: 400px;
  }
`

const HeaderSearchInput = styled(TextInput)`
  background: white;
  color: black;
  font-size: 14px;
`

const ContainerBox = styled(Box)`
  border-radius: 0.5em;
  box-shadow: 1px 1px 4px 0px #00000040 inset;
`

export default function HeaderSearchForm ({
  project,
}) {
  const env = getEnv()
  const queryFromUrl = getQuery() || ''
  const [ query, setQuery ] = useState(queryFromUrl)
  const location = useLocation()

  useEffect(function onUrlChange_getQueryFromUrl () {
    setQuery(queryFromUrl)
  }, [ location ])

  if (!project) return

  return (
    <StyledForm
      action={`/projects/${project?.slug}/search`}
      method='get'
    >
      <ContainerBox
        align='center'
        background='white'
        direction='row'
        gap='4px'
        pad='7px 7px 7px 14px'
      >
        <Search color='black' size='small' />
        <HeaderSearchInput
          name='query'
          value={query}
          onChange={e => setQuery(e?.target?.value)}
          plain='full'
        />
        <Button plain icon={<DeleteIcon size='small' a11yTitle={strings.components.header.clear_query} />} onClick={e => setQuery('')} />
      </ContainerBox>
      {(env)
        ? <input name='env' value={env} type='hidden' />
        : null
      }
    </StyledForm>
  )
}
