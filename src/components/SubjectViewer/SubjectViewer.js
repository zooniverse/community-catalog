import { useEffect, useState } from 'react'
import { Box, Button, Image } from 'grommet'
import { Image as ImageIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings, { css } from '@src/strings.json'
import fetchSubject from '@src/helpers/fetchSubject'

const FILMSTRIP_IMAGE_SIZE = 44
const GOLD_COLOUR = '#F0B200'

const ImageWithBorder = styled(Image)`
  border: 3px solid ${props => props.color}
`

export default function SubjectViewer ({
  src,
  subject = undefined,
  subjectId = '',  // For an example, use Subject '69734802', of Project 12268, in Subject Set 98889. see https://www.zooniverse.org/projects/bogden/scarlets-and-blues/talk/subjects/69734802
  width = 200,
  height = 200,
  fit,
  small = false,
}) {

  const [ subjectData, setSubjectData ] = useState(subject)
  const [ index, setIndex ] = useState(0)

  useEffect(function onSubjectChange () {
    if (subject) setSubjectData(subject)

    // If no Subject has been specified, but we have a Subject ID, fetch that Subject.
    if (!subjectData && subjectId) {
      fetchSubject(subjectId, setSubjectData)
    }
  }, [subject, subjectId])
  
  let filmstripSrcs = []
  let imgSrc = src

  if (subjectData) {
    // TODO: improve URL extraction
    imgSrc = subjectData.locations?.[index]?.['image/jpeg']
             || subjectData.locations?.[index]?.['image/png']

    // Send Zooniverse-hosted images through the thumbnail service
    if (small && imgSrc.match(/^https?:\/\/panoptes-uploads.zooniverse.org\//)) {
      imgSrc = `https://thumbnails.zooniverse.org/${width}x${height}/${imgSrc?.replace(/^https?:\/\//ig, '')}`
    }

    filmstripSrcs = subjectData.locations.map(src => {
      const filmstripSrc = src['image/jpeg'] || src['image/png']
      return `https://thumbnails.zooniverse.org/${FILMSTRIP_IMAGE_SIZE}x${FILMSTRIP_IMAGE_SIZE}/${filmstripSrc?.replace(/^https?:\/\//ig, '')}`
    })
  }

  return (
    <Box>
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
      <Box
        direction='row'
        justify='center'
      >
        {filmstripSrcs.map((filmstripSrc, _index) => {
          const isSelected = _index === index

          return (
            <Button
              key={`subject-viewer-filmstrip-${_index}`}
              margin={{ horizontal: 'xxsmall', vertical: 'small' }}
            >
              <ImageWithBorder
                /* TODO alt={strings.components.subject_image.image.replace(/{index}/g, _index).replace(/{subject_id}/g, subjectId)}*/
                color={(isSelected) ? GOLD_COLOUR : 'transparent'}
                fit='cover'
                src={filmstripSrc}
                height={FILMSTRIP_IMAGE_SIZE}
                width={FILMSTRIP_IMAGE_SIZE}
                onClick={() => { setIndex(_index) }}
              />
            </Button>
          )
          })}
      </Box>
    </Box>
  )
}
