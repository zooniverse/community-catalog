import { useState } from 'react'

export function useStores () {
  const [ initialised, setInitialised ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ project, setProject ] = useState(null)

  return {
    initialised, setInitialised,
    user, setUser,
    project, setProject,
  }
}