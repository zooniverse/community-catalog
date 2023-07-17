import { useEffect, useState } from 'react'
import { Box, Button, Image } from 'grommet'
import { FormNext as RightIcon, FormPrevious as LeftIcon, Image as ImageIcon } from 'grommet-icons'
import styled from 'styled-components'

import strings from '@src/strings.json'
import fetchSubject from '@src/helpers/fetchSubject'

const FILMSTRIP_IMAGE_SIZE = 44
const GOLD_COLOUR = '#F0B200'

const ImageWithBorder = styled(Image)`
  border: 3px solid ${props => props.color}
`

export default function SubjectViewer ({
  src,
  subject = undefined,
  width = 200,
  height = 200,
}) {
  const subjectData = subject
  const subjectId = subject?.id
  const [ index, setIndex ] = useState(0)

  useEffect(function onSubjectChange () {
    setIndex(0)

  }, [subject])

  function goPrevIndex () {
    setIndex(Math.max(index - 1, 0))
  }

  function goNextIndex () {
    setIndex(Math.min(index + 1, subjectData?.locations?.length - 1 || 0))
  }
  
  let filmstripSrcs = []
  let imgSrc = src

  if (subjectData) {
    // TODO: improve URL extraction
    imgSrc = subjectData.locations?.[index]?.['image/jpeg']
             || subjectData.locations?.[index]?.['image/png']

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
        overflow='hidden' 
      >
        {imgSrc ? (
          <Image
            alt={strings.components.subject_viewer.image.replace(/{index}/g, index).replace(/{subject_id}/g, subjectId)}
            fit={'contain'}
            src={imgSrc}
          />
        ) : (  /* Placeholder when there's no image to load, or Subject is in process of loading */
          <ImageIcon
            a11yTitle={strings.components.subject_viewer.placeholder}
            size='large'
          />
        )}
      </Box>
      <Box
        direction='row'
        justify='center'
      >
        {(filmstripSrcs.length > 0)
          ? <Button
              a11yTitle={strings.components.subject_viewer.prev_item}
              icon={<LeftIcon />}
              onClick={goPrevIndex}
            />
          : null
        }

        {filmstripSrcs.map((filmstripSrc, _index) => {
          const isSelected = _index === index

          return (
            <Button
              key={`subject-viewer-filmstrip-${_index}`}
              margin={{ horizontal: 'xxsmall', vertical: 'small' }}
            >
              <ImageWithBorder
                /* TODO alt={strings.components.subject_viewer.image.replace(/{index}/g, _index).replace(/{subject_id}/g, subjectId)}*/
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

        {(filmstripSrcs.length > 0)
          ? <Button
              a11yTitle={strings.components.subject_viewer.next_item}
              icon={<RightIcon />}
              onClick={goNextIndex}
            />
          : null
        }
      </Box>
    </Box>
  )
}
