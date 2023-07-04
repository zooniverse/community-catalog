import { Box, Form, Text, TextInput } from 'grommet'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import strings from '@src/strings.json'
import { ADVANCED_QUERY_PREFIX, KEYWORDS_KEY } from '@src/config.js'
import getEnv from '@src/helpers/getEnv.js'
import convertAdvancedQueryFromString from '@src/helpers/convertAdvancedQueryFromString.js'
import convertAdvancedQueryToString from '@src/helpers/convertAdvancedQueryToString.js'

const InputForText = styled(TextInput)`
  background: white;
  color: black;
`

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
            <Text as='label' htmlFor='tag'>{strings.components.advanced_search.keywords_label}</Text>
            <InputForText name={`${ADVANCED_QUERY_PREFIX}${KEYWORDS_KEY}`} />
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
