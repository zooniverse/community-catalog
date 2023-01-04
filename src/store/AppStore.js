import { useState } from 'react'

export function initAppStore () {
  const [ debugText, setDebugText ] = useState('debugText')
  const [ initialised, setInitialised ] = useState(false)
  const [ user, setUser ] = useState(null)

  return {
    debugText, setDebugText,
    initialised, setInitialised,
    user, setUser,
  }
}
