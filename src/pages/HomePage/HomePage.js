import { Box } from 'grommet'
import { Link } from 'react-router-dom'

import projectsJson from '@src/projects.json'

function HomePage () {
  return (
    <Box
      background='dark-1'
      gap='small'
      pad='small'
    >
      {projectsJson.projects.map(proj => (
        <Box
          background='light-1'
          pad='small'
        >
          <Link to={`/projects/${proj.slug}`}>{proj.name}</Link>
        </Box>
      ))}
    </Box>
  )
}

export default HomePage
