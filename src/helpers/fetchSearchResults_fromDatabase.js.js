/*
Fetches search results from the Subjects database. Specifically, it searches for TAGs
(hashtags) in posts, for a specific project.

Inputs:
- (string/int) projectId
- (object) queryObject: contains keys with values to search for.
  e.g. { colour: [ 'red', 'blue' ], shape: ['circle'], texture: ['%soft%'] }
  becomes "SELECT * FROM whatever WHERE (colour = 'red' OR colour = 'blue') AND (shape = 'circle) AND (texture LIKE '%soft%')"
- (function) setData: callback function after successful data fetch

Outputs:
- Array of subject IDs (strings)
 */

const DATABASE_URL = 'https://subject-set-search-api.zooniverse.org/'
const DATABASE_NAME = 'projects'
const TABLE_PREFIX = 'proj_'
const SUBJECT_ID_KEY = 'subject_id'

export default async function fetchSearchResults_fromDatabase (
  projectId,
  queryObject = {}
) {
  if (!projectId) return

  // Example: https://subject-set-search-api.zooniverse.org/projects.json?sql=select+*+from+proj_21084+where+%5Bfolder%5D+like+%27%25jamaica%25%27
  try {
    const sqlQuery = `SELECT subject_id FROM ${TABLE_PREFIX}${projectId} WHERE true`
    const url = `${DATABASE_URL}/${DATABASE_NAME}.json?sql=${encodeURIComponent(sqlQuery)}`

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
