import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'

import Link from '@src/components/Link'
import SubjectImage from '@src/components/SubjectImage'
import fetchSubject from '@src/helpers/fetchSubject.js'

export default function SearchResult ({
  subjectId = '',
  projectSlug = '',
  titleField = '',
}) {
  const [ subjectData, setSubjectData ] = useState(null)
  const title = subjectData?.metadata?.[titleField] || ''

  useEffect(function () {
    if (subjectId) fetchSubject(subjectId, setSubjectData)
  }, [ subjectId ])

  return (
    <Link
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
        {title && (
          <Box pad='small'>
            <Text>{title}</Text>
          </Box>
        )}
      </Box>
    </Link>
  )
}
