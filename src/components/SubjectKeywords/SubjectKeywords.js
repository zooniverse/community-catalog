import { useEffect, useState } from 'react'
import { Box, Spinner, Text } from 'grommet'
import { Code as CodeIcon } from 'grommet-icons'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import strings from '@src/strings.json'
import { ASYNC_STATES } from '@src/config.js'
import { useStores } from '@src/store'
import fetchKeywords from '@src/helpers/fetchKeywords'
import Link from '@src/components/Link'

const KeywordLink = styled(Link)`
  text-decoration: none;
`

const KeywordBox = styled(Box)`
  &:hover {
    background: #00979d;
  }

  &:active {
    background: #005D69;
  }
`

const { READY, FETCHING, ERROR } = ASYNC_STATES

function SubjectKeywords ({
  subject = undefined,
}) {
  const { project } = useStores()
  const projectId = project?.id
  const projectSlug = project?.slug || '' 

  const [ keywordsData, setKeywordsData ] = useState([])
  const [ status, setStatus ] = useState(READY)

  useEffect(function onTargetChange_resetThenFetchData () {
    setKeywordsData([])
    setStatus(READY)
    doFetchData()
  }, [ projectId, subject ])

  async function doFetchData() {
    if (subject) {
      try {
        setStatus(FETCHING)
        const keywords = await fetchKeywords(projectId, 1, subject)
        setKeywordsData(keywords)
        // TODO: fetch more than one page of keywords?
        setStatus(READY)

      } catch (err) {
        setStatus(ERROR)
        console.error('<SubjectKeyword>', err)
      }
    }
  }

  if (!subject) return (
    <CodeIcon a11yTitle={strings.general.data_placeholder} />
  )

  return (
    <Box
      align='end'
      className='subject-keywords'
    >
      <Text color='light-6' margin={{ bottom: 'small' }}>
        {strings.components.subject_keywords.community_tags}
      </Text>
      <Box
        direction='row'
        gap='small'
        justify='end'
        wrap={true}
      >
        {(status === READY && keywordsData.length === 0)
          ? <Text>{strings.components.subject_keywords.no_keywords}</Text>
          : null
        }
        {keywordsData.map((keyword, i) => (
          <KeywordLink
            key={`subject-keyword-${i}`}
            to={`/projects/${projectSlug}/search?query=${encodeURIComponent(keyword.name)}`}
          >
            <KeywordBox
              background='light-2'
              elevation='xsmall'
              margin={{ bottom: 'small' }}
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              round='large'
            >
              <Text color='black'>#{keyword.name}</Text>
            </KeywordBox>
          </KeywordLink>
        ))}
        {(status === FETCHING) && (<Spinner />)}
        {(status === ERROR) && (<Text color='red'>{strings.general.error}</Text>)}
      </Box>
    </Box>
  )
}

export default observer(SubjectKeywords)