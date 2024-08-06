import { useContext } from 'react'
import { Box, ResponsiveContext } from 'grommet'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import CommunityCatalogHeader from './CommunityCatalogHeader.js'
import ProjectHeader from './ProjectHeader.js'

function Header () {
  const { project } = useStores()
  const size = useContext(ResponsiveContext)

  return (
    <Box
      align='center'
      as='header'
      className='header'
      background='black'
      direction='column'
      style={{ overflow: 'hidden' }}
    >
      <CommunityCatalogHeader
        size={size}
      />
      <ProjectHeader
        project={project}
        size={size}
      />
    </Box>
  )
}

export default observer(Header)
