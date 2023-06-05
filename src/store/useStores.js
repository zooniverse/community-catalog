import { useContext } from 'react'
import AppContext from './AppContext.js'

export default function useStores(
  /** optional function which should take a store and return an object containing filtered store properties. */
  storeMapper = store => store
) {
  const appStore = useContext(AppContext)
  return storeMapper(appStore)
}
