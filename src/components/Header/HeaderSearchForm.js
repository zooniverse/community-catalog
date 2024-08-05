import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Button, TextInput } from 'grommet'
import { Search, FormClose as DeleteIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'
import getEnv from '@src/helpers/getEnv.js'
import getQuery from '@src/helpers/getQuery.js'

const StyledForm = styled('form')`
  margin: 0;
`

const HeaderSearchInput = styled(TextInput)`
  background: white;
  color: black;
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
      <Box
        background='white'
        direction='row'
        pad='11.5px'
      >
        <HeaderSearchInput
          name='query'
          icon={<Search color='black' size='small' />}
          value={query}
          onChange={e => setQuery(e?.target?.value)}
          width={{ min: 'medium', max: 'xlarge' }}
          plain='full'
        />
        <Button plain icon={<DeleteIcon size='small' a11yTitle={strings.components.header.clear_query} />} onClick={e => setQuery('')} />
      </Box>
      {(env)
        ? <input name='env' value={env} type='hidden' />
        : null
      }
    </StyledForm>
  )
}
