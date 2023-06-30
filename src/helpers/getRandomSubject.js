/*
Asks the Subjects Database for a random Subject ID.

Inputs:
- (string/int) projectId

Outputs:
- (string) Subject ID
 */

const DATABASE_URL = 'https://subject-set-search-api.zooniverse.org/'
const DATABASE_NAME = 'projects'
const TABLE_PREFIX = 'proj_'
const SUBJECT_ID_KEY = 'subject_id'

export default async function getRandomSubject (
  projectId,
) {
  if (!projectId) return []

  // SQL query: SELECT subject_id FROM (table) ORDER BY RANDOM() LIMIT 1
  // Example: https://subject-set-search-api.zooniverse.org/projects-d2c21b9.json?sql=SELECT+subject_id+FROM+proj_12268+ORDER+BY+RANDOM%28%29+LIMIT+1
  try {
    const sqlQuery = encodeURIComponent(`SELECT subject_id FROM ${TABLE_PREFIX}${projectId} ORDER BY RANDOM() LIMIT 1`)
    const randomiser = Math.floor(Math.random() * 10000)  // Bypasses cached results

    const url = `${DATABASE_URL}/${DATABASE_NAME}.json?sql=${sqlQuery}&rnd=${randomiser}`
    const response = await fetch(url)

    if (!response?.ok) throw new Error('Couldn\'t get random subject')

    let results =  await response.json()
    const indexOfSubjectId = results?.columns?.indexOf(SUBJECT_ID_KEY)
    return results?.rows?.[0]?.[indexOfSubjectId]?.toString()

  } catch (err) {
    console.error(err)
    throw(err)
    // TODO: handle errors
  }
}

function convertQueryObjectToSqlWhere (queryObject = {}) {
  const params = []
  let paramCounter = 0
  const where = Object.entries(queryObject).map(([field, arr]) => {
    const fieldPart = arr.map(val => {
      const existingParam = params.find(p => p[1] === val)
      let paramKey = ''
      if (existingParam) {
        paramKey = existingParam[0]
      } else {
        paramKey = `p${paramCounter++}`
        params.push([paramKey, val])
      }
      
      if (val.includes('%')) return `[${field}] LIKE :${paramKey}`
      else return `[${field}] = :${paramKey}`
    }).join(' OR ')

    return `(${fieldPart})`
  }).join(' OR ')  // TODO: fix! Is this OR or AND?

  return {
    where, params
  }
}

function cleanSqlParam (str) {
  return str
}