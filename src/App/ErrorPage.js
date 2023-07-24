/*
Error page. Keep this as simple as possible.
 */

import { useRouteError } from 'react-router-dom'
import strings from '@src/strings.json'

export default function ErrorPage () {
  const error = useRouteError()
  console.error('ErrorPage', error)

  let title = strings.errors.general_error
  let details = error?.toString()

  if (error?.status) {
    
    title = `${error.status} ${error.statusText}` 
    details = error.error?.message || details
  }

  return (
    <>
      <h2>{title}</h2>
      <p>{details}</p>
    </>
  )
}