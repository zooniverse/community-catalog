/*
Fetches random items from the Subjects database.

Inputs:
- (string/int) projectId
- (int) quantity

Outputs:
- Array of subject IDs (strings)
 */

import {
  DATABASE_NAME, DATABASE_URL, TABLE_PREFIX, SUBJECT_ID_KEY, PAGE_SIZE
} from '@src/config.js'

export default async function fetchRandomSubjects (
  projectId,
  quantity = PAGE_SIZE
) {
  if (!projectId) return []

  // Example: https://subject-set-search-api.zooniverse.org/projects.json?sql=select+subject_id+from+proj_12268+order+by+random%28%29+limit+10
  try {
    const sqlQuery = encodeURIComponent(`SELECT subject_id FROM ${TABLE_PREFIX}${projectId} ORDER BY random() LIMIT ${quantity}`)
    const randomiser = Math.floor(Math.random() * 10000)  // Bypasses cached results

    const url = `${DATABASE_URL}/${DATABASE_NAME}.json?sql=${sqlQuery}&rnd=${randomiser}`

    const response = await fetch(url)

    if (!response?.ok) throw new Error('Couldn\'t fetch random items')

    let results =  await response.json()
    const indexOfSubjectId = results?.columns?.indexOf(SUBJECT_ID_KEY)
    return results?.rows?.map(item => (item[indexOfSubjectId] || '').toString()) || []

  } catch (err) {
    console.error(err)
    throw(err)
    // TODO: handle errors
  }
}
