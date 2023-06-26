import { useEffect, useState } from 'react'
import { Box, Image, Spinner } from 'grommet'
import { Image as ImageIcon } from 'grommet-icons'
import fetchSubject from '@src/helpers/fetchSubject'

export default function SubjectImage ({
  src,
  subject = undefined,
  subjectId = '',  // For an example, use Subject '69734802', of Project 12268, in Subject Set 98889. see https://www.zooniverse.org/projects/bogden/scarlets-and-blues/talk/subjects/69734802
  width = 200,
  height = 200,
  fit,
  small = false,
}) {

  const [ subjectData, setSubjectData ] = useState(subject)

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
    imgSrc = subjectData.locations?.[0]?.['image/jpeg']
             || subjectData.locations?.[0]?.['image/png']

    if (small && imgSrc.match(/^https?:\/\/panoptes-uploads.zooniverse.org\//)) {
      imgSrc = `https://thumbnails.zooniverse.org/${width}x${height}/${imgSrc?.replace(/^https?:\/\//ig, '')}`
    }
  }

  return (
    <Box
      background='light-1'
      border={true}
      width={`${width}px`}
      height={`${height}px`}
      align={imgSrc ? undefined : 'center'} 
      justify={imgSrc ? undefined : 'center'} 
    >
      {imgSrc ? (
        <Image
          fit={fit || (small ? 'cover' : 'contain')}
          src={imgSrc}
        />
      ) : (  /* Placeholder when there's no image to load, or Subject is in process of loading */
        <ImageIcon
          size='large'
        />
      )}
    </Box>
  )
}
