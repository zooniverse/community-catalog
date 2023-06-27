import { Link as BaseLink } from 'react-router-dom'

import getEnv from '@src/helpers/getEnv'
import getQuery from '@src/helpers/getQuery'

export default function Link (props) {
  const { to, children } = props

  const otherProps = { ...props }
  otherProps.to && delete otherProps.to
  otherProps.children && delete otherProps.children
  
  const toUrl = [ to ]
  const env = getEnv()
  const query = getQuery()

  if (!to.includes('?')) toUrl.push('?')
  if (env) toUrl.push(`&env=${encodeURIComponent(env)}`)

  // Keep the query consistent, if the intended URL doesn't already have its own query
  if (query && !to.match(/[\?&]query=/ig)) toUrl.push(`&query=${encodeURIComponent(query)}`)
  
  return (
    <BaseLink
      to={toUrl.join('')}
      {...otherProps}
    >
      {children}
    </BaseLink>
  )
}
