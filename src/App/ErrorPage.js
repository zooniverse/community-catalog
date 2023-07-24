/*
Error page. Keep this as simple as possible.
 */

import { useRouteError } from 'react-router-dom'

export default function ErrorPage () {
  const error = useRouteError()
  console.error('ErrorPage',error)

  return (
    <>
      <h1>Error</h1>
      <p>{error?.toString()}</p>
    </>
  )
}