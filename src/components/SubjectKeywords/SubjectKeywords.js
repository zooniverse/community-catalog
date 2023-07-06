import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { useStores } from '@src/store'
import fetchKeywords from '@src/helpers/fetchKeywords'
import Link from '@src/components/Link'

const KeywordLink = styled(Link)`
  text-decoration: none;
`
function SubjectKeywords ({
  subject = undefined,
}) {
  const { project } = useStores()
  const projectId = project?.id
  const projectSlug = project?.slug || '' 

  const [ keywordsData, setKeywordsData ] = useState([])

  useEffect(function () {
    if (subject) {
      fetchKeywords(
        projectId,
        setKeywordsData,
        1,  // Page
        subject
      )
    }
  }, [ projectId, subject ])

  return (
    <Box
      align='end'
    >
      <Text color='light-6' margin={{ bottom: 'small' }}>
        {strings.components.subject_keywords.community_tags}
      </Text>
      <Box
        direction='row'
        gap='small'
        wrap={true}
      >
        {(keywordsData.length === 0)
          ? <Text>{strings.components.subject_keywords.no_keywords}</Text>
          : null
        }
        {keywordsData.map((keyword, i) => (
          <KeywordLink
            key={`subject-keyword-${i}`}
            to={`/projects/${projectSlug}/search?query=${encodeURIComponent(keyword.name)}`}
          >
            <Box
              background='light-2'
              elevation='xsmall'
              margin={{ bottom: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='black'>#{keyword.name}</Text>
            </Box>
          </KeywordLink>
        ))}
      </Box>
    </Box>
  )
}

export default observer(SubjectKeywords)