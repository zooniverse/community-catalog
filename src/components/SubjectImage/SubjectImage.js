import { useEffect, useState } from 'react'
import { Box, Image } from 'grommet'
import { Image as ImageIcon } from 'grommet-icons'

import strings from '@src/strings.json'
import fetchSubject from '@src/helpers/fetchSubject'

export default function SubjectImage ({
  background = 'light-1',
  border = true,
  src,
  subject = undefined,
  subjectId = '',  // For an example, use Subject '69734802', of Project 12268, in Subject Set 98889. see https://www.zooniverse.org/projects/bogden/scarlets-and-blues/talk/subjects/69734802
  width = 200,
  height = 200,
  fit,
  small = false,
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
    >
      {imgSrc ? (
        <Image
          alt={strings.components.subject_image.image.replace(/{index}/g, index).replace(/{subject_id}/g, subjectId)}
          fit={fit || (small ? 'cover' : 'contain')}
          src={imgSrc}
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
