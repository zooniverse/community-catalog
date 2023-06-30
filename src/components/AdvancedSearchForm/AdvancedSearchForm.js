import { Box, Form, Text, TextInput } from 'grommet'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import strings from '@src/strings.json'
import { ADVANCED_QUERY_PREFIX } from '@src/config.js'
import getEnv from '@src/helpers/getEnv.js'

const InputForText = styled(TextInput)`
  background: white;
  color: black;
`

// Example: { one: 'abc', two: '', three: '===' } should return "{one=abc} {three====}"
// Assumption: keys don't contain '='
function convertAdvancedQueryToString (data) {
  return Object.entries(data).map(([key, val = '']) => {
    const _key = key.replace(RegExp(`^${ADVANCED_QUERY_PREFIX}`), '')
    const _val = val.trim()  // TODO: what if val has { or } ?
    return (_val)
      ? `{${_key}=${_val}}`
      : ''
  }).join(' ')
}

// Example: "{one=abc} {two=} {three====}" should return { one: 'abc', three: '===' }
// Assumption: keys don't contain '='
function convertAdvancedQueryFromString (str = '') {
  const data = {}
  str.match(/{[^{}=]+=[^{}]*}/g)?.forEach(item => {
    const match = item.match(/^{([^=]+)=(.*)}$/)  // Don't use global (g)
    if (match?.[1] && match?.[2]) {  // match[1] is the key, match[2] is the value
      data[match[1]] = match[2]
    }
  })
  return data
}

export default function AdvancedSearchForm ({ project }) {
  if (!project) return null
  const projectSlug = project.slug
  const env = getEnv()
  const navigate = useNavigate()

  // Submit the advanced search query
  // Note that the parent SearchPage has to listen for changes in the URL, since
  // navigating to the same /search route won't automatically re-render the
  // component.
  function onSubmit ({ value: data }) {
    const query = convertAdvancedQueryToString(data)
    console.log('+++ query: ', query)
    const testData = convertAdvancedQueryFromString(query)
    console.log('+++ testData: ', testData)

    navigate(`/projects/${projectSlug}/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <Box
      pad='small'
      gap='small'
    >
      <Form
        onSubmit={onSubmit}
      >
        <Box>
          <Box>
            <Text as='label' htmlFor='query'>DEBUG QUERY</Text>
            <InputForText name='query' />
          </Box>
          {project.advanced_search?.map(item => {
            const name = `${ADVANCED_QUERY_PREFIX}${item.field}`
            const display = item.alias || item.field
            
            return (
              <Box key={name}>
                <Text as='label' htmlFor={name}>{display}</Text>
                <InputForText name={name} />
              </Box>
            )
          })}
        </Box>
        <Box>
          <button type='submit'>TEST</button>
        </Box>
      </Form>
    </Box>
  )
}
