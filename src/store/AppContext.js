import { createContext } from 'react'

// const defaultContext = AppStore.create({})  // Default values can be specified here, or within the stores themselves using types.optional()

// Note: there are two ways to specify the value of the context.
// 1.
// 2.
// In this case,
export const AppContext = createContext(null)
