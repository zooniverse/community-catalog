/*
Fetches search results from the Subjects database. Specifically, it searches for TAGs
(hashtags) in posts, for a specific project.

Inputs:
- (string/int) projectId
- (object) queryObject: contains keys with values to search for.
  e.g. { colour: 'red', shape: 'circle' }
  becomes "SELECT * FROM whatever WHERE (colour = '%red%') OR (shape = '%circle%')"
- (function) setData: callback function after successful data fetch

Outputs:
- Array of subject IDs (strings)
 */

import {
  DATABASE_NAME, DATABASE_URL, TABLE_PREFIX, SUBJECT_ID_KEY, PAGE_SIZE
} from '@src/config.js'

export default async function fetchSearchResults_fromDatabase (
  projectId,
  queryObject = {}
) {
  if (!projectId) return []

  if (Object.entries(queryObject).length === 0) return []

  // Example: https://subject-set-search-api.zooniverse.org/projects.json?sql=select+*+from+proj_21084+where+%5Bfolder%5D+like+%27%25jamaica%25%27
  try {
    const { where = '', params = [] } = convertQueryObjectToSqlWhere(queryObject)
    const sqlQuery = encodeURIComponent(`SELECT subject_id FROM ${TABLE_PREFIX}${projectId} ${where ? `WHERE ${where}` : ''} LIMIT ${PAGE_SIZE}`)
    const sqlParam = params.map(p => `&${p[0]}=${encodeURIComponent(p[1])}`, '').join('')

    const url = `${DATABASE_URL}/${DATABASE_NAME}.json?sql=${sqlQuery}${sqlParam}`

    const response = await fetch(url)

    if (!response?.ok) throw new Error('Couldn\'t fetch database search results')

    let results =  await response.json()
    const indexOfSubjectId = results?.columns?.indexOf(SUBJECT_ID_KEY)
    return results?.rows?.map(item => (item[indexOfSubjectId] || '').toString()) || []

  } catch (err) {
    console.error(err)
    throw(err)
    // TODO: handle errors
  }
}

function convertQueryObjectToSqlWhere (queryObject = {}) {
  const params = []
  let paramCounter = 0
  const where = Object.entries(queryObject).map(([field, val]) => {
    const _val = `%${val}%`
    const existingParam = params.find(p => p[1] === _val)
    let paramKey = ''
    if (existingParam) {
      paramKey = existingParam[0]
    } else {
      paramKey = `p${paramCounter++}`
      params.push([paramKey, _val])
    }

    return `[${field}] LIKE :${paramKey}`
  }).join(' OR ')  // TODO: fix! Is this OR or AND?

  return {
    where, params
  }
}

function cleanSqlParam (str) {
  return str
}