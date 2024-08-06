import { useContext } from 'react'
import { Box, ResponsiveContext } from 'grommet'
import { observer } from 'mobx-react'

import { useStores } from '@src/store'
import CommunityCatalogHeader from './CommunityCatalogHeader.js'
import ProjectHeader from './ProjectHeader.js'

const containerProps = {
  align: 'center',
  alignContent: 'center',
  as: 'header',
  background: 'black',
  direction: 'row',
  pad: 'small',
  wrap: true,
}

function Header () {
  const { project } = useStores()
  const size = useContext(ResponsiveContext)

  return (
    <Box
      {...containerProps}
      cssGap={true}
      className='header'
      direction='column'
      gap='small'
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
