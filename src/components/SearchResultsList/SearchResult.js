import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { Hide as SensitiveContentIcon } from 'grommet-icons'
import styled from 'styled-components'

import { SUBJECT_IMAGE_SIZE } from '@src/config.js'
import strings from '@src/strings.json'
import Link from '@src/components/Link'
import SubjectImage from '@src/components/SubjectImage'
import fetchSubject from '@src/helpers/fetchSubject.js'
import checkForSensitiveContent from '@src/helpers/checkForSensitiveContent.js'

const CleanLink = styled(Link)`
  text-decoration: none;
`

const SensitiveContentBox = styled(Box)`
  position: relative;
  top: -${SUBJECT_IMAGE_SIZE}px;
  width: ${SUBJECT_IMAGE_SIZE}px;
  height: ${SUBJECT_IMAGE_SIZE}px;
  margin-bottom: -${SUBJECT_IMAGE_SIZE}px;
  background: rgba(128, 128, 128, 0.5);
`

export default function SearchResult ({
  subjectId = '',
  project,
  titleField = '',
  showSensitive = false,
}) {
  const [ subjectData, setSubjectData ] = useState(null)
  const title = subjectData?.metadata?.[titleField] || ''

  useEffect(function onTargetChange_fetchData () {
    if (subjectId) fetchSubject(subjectId, setSubjectData)
  }, [ subjectId ])
  
  const hasSensitiveContent = checkForSensitiveContent(subjectData, project)
  const hideContent = (!showSensitive && hasSensitiveContent)

  return (
    <CleanLink
      className='search-result'
      to={`/projects/${project?.slug}/subject/${subjectId}`}
    >
      <Box
        background='white'
        elevation='small'
        width={`${SUBJECT_IMAGE_SIZE}px`}
        margin={{ bottom: 'small', right: 'small' }}
      >
        <SubjectImage
          subject={subjectData}
          small={true}
          width={SUBJECT_IMAGE_SIZE}
          height={SUBJECT_IMAGE_SIZE}
          blur={hideContent}
        />
        {(hideContent)
          ? <SensitiveContentBox
              align='center'
              pad='small'
              justify='center'
            >
              <SensitiveContentIcon
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
            </SensitiveContentBox>
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
