import { useEffect, useState } from 'react'
import { Box, Image } from 'grommet'
import { Image as ImageIcon } from 'grommet-icons'
import styled from 'styled-components'

import { SUBJECT_IMAGE_SIZE } from '@src/config.js'
import strings from '@src/strings.json'
import fetchSubject from '@src/helpers/fetchSubject'

const MainImage = styled(Image)`
  ${props => props.blur
    ? 'filter: blur(8px);'
    : ''
  }
`

export default function SubjectImage ({
  background = 'light-1',
  border = true,
  src,
  subject = undefined,
  subjectId = '',  // For an example, use Subject '69734802', of Project 12268, in Subject Set 98889. see https://www.zooniverse.org/projects/bogden/scarlets-and-blues/talk/subjects/69734802
  width = SUBJECT_IMAGE_SIZE,
  height = SUBJECT_IMAGE_SIZE,
  fit,
  small = false,
  blur = false,  // Blur the image. Used to "hide" sensitive content.
}) {
  const [ subjectData, setSubjectData ] = useState(subject)
  const index = 0

  useEffect(function () {
    if (subject) setSubjectData(subject)

    // If no Subject has been specified, but we have a Subject ID, fetch that Subject.
    if (!subjectData && subjectId) {
      fetchSubject(subjectId, setSubjectData)
    }
  }, [subject, subjectId])
  
  let imgSrc = src
  if (subjectData) {
    // TODO: improve URL extraction
    imgSrc = subjectData.locations?.[index]?.['image/jpeg']
             || subjectData.locations?.[index]?.['image/png']

    // Send Zooniverse-hosted images through the thumbnail service
    if (small && imgSrc.match(/^https?:\/\/panoptes-uploads.zooniverse.org\//)) {
      imgSrc = `https://thumbnails.zooniverse.org/${width}x${height}/${imgSrc?.replace(/^https?:\/\//ig, '')}`
    }
  }

  return (
    <Box
      background={background}
      border={border}
      width={`${width}px`}
      height={`${height}px`}
      align={imgSrc ? undefined : 'center'} 
      justify={imgSrc ? undefined : 'center'}
      overflow='hidden'
    >
      {imgSrc ? (
        <MainImage
          alt={strings.components.subject_image.image.replace(/{subject_id}/g, (subjectId || subject?.id))}
          fit={fit || (small ? 'cover' : 'contain')}
          src={imgSrc}
          blur={blur}
        />
      ) : (  /* Placeholder when there's no image to load, or Subject is in process of loading */
        <ImageIcon
          a11yTitle={strings.components.subject_image.placeholder}
          size='large'
        />
      )}
    </Box>
  )
}
