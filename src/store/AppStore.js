import { useState } from 'react'

export function initAppStore () {
  const [ initialised, setInitialised ] = useState(false)
  const [ user, setUser ] = useState(null)

  return {
    initialised, setInitialised,
    user, setUser,
  }
}
