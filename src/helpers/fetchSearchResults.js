/*
Fetches search results from both Zooniverse Talk and the Subjects database.

Inputs:
- (object) project: project config object (see projects.json)
- (string) query
  e.g. to search for Talk posts tagged with "#penguins", pass in queryString="penguins"
- (function) setData: callback function after successful data fetch

Outputs:
- Array of unique subject IDs (strings)
 */

import { KEYWORDS_KEY } from '@src/config.js'
import convertAdvancedQueryFromString from './convertAdvancedQueryFromString.js'
import fetchSearchResults_fromTalk from './fetchSearchResults_fromTalk.js'
import fetchSearchResults_fromDatabase from './fetchSearchResults_fromDatabase.js'

export default async function fetchSearchResults (
  project,
  query = '',
  setData = (data) => { console.log('fetchSearchResults_fromTalk: ', data) }
) {

  if (!project) throw new Error('fetchSearchResults() requires a project')
  
  // const queryString = query
  // const queryObject = applyQueryToAllDatabaseFields(project, query)

  let queryForTalk = ''
  let queryForDatabase = {}
  const queryObject = convertAdvancedQueryFromString(query)

  if (isThisAnAdvancedQuery(query)) {
    // An advanced query searches for specific values in specific fields,
    // e.g. "{animal=cat} {color=orange} {loves=lasagna} {hates=mondays}"

    const {
      [KEYWORDS_KEY]: a,
      ...b
    } = queryObject

    queryForTalk = a
    queryForDatabase = b

  } else {
    // A simple query searches for a common value across all fields,
    // e.g. "cat" will return results if either animal/color/loves/hates/etc contains that word.
    
    queryForTalk = query
    queryForDatabase = applyQueryToAllDatabaseFields(project, query)
  }

  const allSubjectIds = await Promise.all([
    fetchSearchResults_fromTalk(project.id, queryForTalk),
    fetchSearchResults_fromDatabase(project.id, queryForDatabase)
  ])

  // Flatten into a single array, then remove duplicates
  const subjectIds = Array.from(new Set(allSubjectIds.flat()))

  setData(subjectIds)
}

function isThisAnAdvancedQuery(str) {
  return str.includes('{') && str.includes('}')
}

function applyQueryToAllDatabaseFields (project, query = '') {
  if (!project) return {}

  const queryObject = {}
  project.metadata_fields.map(field => (
    queryObject[field] = query
  ))

  return queryObject
}