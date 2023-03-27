import React from 'react'
import { Box, Image } from 'grommet'

export default function SmallSubjectImage (src) {
  // Example: https://www.zooniverse.org/projects/bogden/scarlets-and-blues/talk/subjects/69734802
  const subjectId = '69734802'  // Part of project 12268
  const imgSrc = 'https://panoptes-uploads.zooniverse.org/subject_location/53714cd8-267d-4467-9af4-06b26f692b51.jpeg'
  const width = 200
  const height = 200
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${width}x${height}/${imgSrc.replace(/^https?:\/\//ig, '')}`

  return (
    <Box
      width={width}
      height={height}
    >
      <Image
        fit="cover"
        src={thumbnailSrc}
      />
    </Box>
  )
}
