import React, { useEffect, useState } from 'react'
import { Box, Image } from 'grommet'
import { subjects } from '@zooniverse/panoptes-js'

export default function SmallSubjectImage ({
  src,
  subject = undefined,
  subjectId = '',  // For an example, use Subject '69734802', of Project 12268, in Subject Set 98889. see https://www.zooniverse.org/projects/bogden/scarlets-and-blues/talk/subjects/69734802
  width = 200,
  height = 200,
  small = false,
}) {

  const [ subjectData, setSubjectData ] = useState(subject)

  useEffect(function () {

    async function fetchSubject (subjectId) {
      try {
        const { body } = await subjects.get({ id: subjectId })
        const [ data ] = body.subjects
        setSubjectData(data)
      } catch (err) {
        console.error('ERROR: ', err)
        // TODO: handle errors
      }
    }

    if (!subjectData && subjectId) {
      fetchSubject(subjectId)
    }

  }, [subjectId])
  

  let imgSrc = src
  if (subjectData) {
    imgSrc = subjectData.locations?.[0]?.['image/jpeg']
             || subjectData.locations?.[0]?.['image/png']

    console.log('+++ imgSrc: ', imgSrc)
    if (small && imgSrc.match(/^https?:\/\/panoptes-uploads.zooniverse.org\//)) {
      imgSrc = `https://thumbnails.zooniverse.org/${width}x${height}/${imgSrc?.replace(/^https?:\/\//ig, '')}`
    }
  }

  if (!imgSrc) imgSrc = 'https://placekitten.com/g/200/200'  // TODO: placeholder 

  if (small) {
    return (
      <Box
        width={`${width}px`}
        height={`${height}px`}
      >
        <Image
          fit='cover'
          src={imgSrc}
        />
      </Box>
    )
  } else {

    return (
      <Image
        width={`${width}px`}
        height={`${height}px`}
        fit='contain'
        src={imgSrc}
      />
    )
  }
}
