/*
Configuration Settings
----------------------
The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed by:
- An env query string, e.g. localhost:3998?env=production, or
- The NODE_ENV environment variable on the system running the app.
 */

const DEFAULT_ENV = 'development'
const envFromBrowser = getSearchParam('env')
const envFromShell = process.env.NODE_ENV
const env = envFromBrowser || envFromShell || DEFAULT_ENV

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${envFromShell}`)
}

const baseConfig = {
  staging: {
    panoptesAppId: ''
  },
  production: {
    panoptesAppId: ''
  }
}

baseConfig.development = baseConfig.staging

const config = baseConfig[env]
export { env, config }

function getSearchParam(key) {
  try {
    return (new URL(location)).searchParams.get(key)
  } catch (err) {
    return null
  }
}
