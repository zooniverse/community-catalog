import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { Hide as SensitivityIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'
import Link from '@src/components/Link'
import SubjectImage from '@src/components/SubjectImage'
import fetchSubject from '@src/helpers/fetchSubject.js'

const CleanLink = styled(Link)`
  text-decoration: none;
`

const SensitivityBox = styled(Box)`
  position: relative;
  top: -200px;
  width: 200px;
  height: 200px;
  margin-bottom: -200px;
  background: rgba(128, 128, 128, 0.5);
`

export default function SearchResult ({
  subjectId = '',
  projectSlug = '',
  titleField = '',
  showSensitive = false,
}) {
  const [ subjectData, setSubjectData ] = useState(null)
  const title = subjectData?.metadata?.[titleField] || ''

  useEffect(function () {
    if (subjectId) fetchSubject(subjectId, setSubjectData)
  }, [ subjectId ])

  return (
    <CleanLink
      to={`/projects/${projectSlug}/subject/${subjectId}`}
    >
      <Box
        background='white'
        elevation='small'
        width='200px'
        margin={{ bottom: 'small' }}
      >
        <SubjectImage
          subject={subjectData}
          small={true}
          width={200}
          height={200}
        />
        {(!showSensitive)
          ? <SensitivityBox
              align='center'
              pad='small'
              justify='center'
            >
              <SensitivityIcon
                color='white'
                size='large'
              />
              <Text
                color='white'
                size='xsmall'
                textAlign='center'
              >
                {strings.components.search_results_list.may_contain_sensitive_content}
              </Text>
            </SensitivityBox>
          : null
        }
        {title && (
          <Box pad='small'>
            <Text>{title}</Text>
          </Box>
        )}
      </Box>
    </CleanLink>
  )
}
