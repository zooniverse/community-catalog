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

import fetchSearchResults_fromTalk from './fetchSearchResults_fromTalk.js'
import fetchSearchResults_fromDatabase from './fetchSearchResults_fromDatabase.js'

export default async function fetchSearchResults (
  project,
  query = '',
  setData = (data) => { console.log('fetchSearchResults_fromTalk: ', data) }
) {

  if (!project) throw new Error('fetchSearchResults() requires a project')
  
  const queryString = query
  const queryObject = convertQueryStringToQueryObject(project, query)

  const allSubjectIds = await Promise.all([
    fetchSearchResults_fromTalk(project.id, queryString),
    fetchSearchResults_fromDatabase(project.id, queryObject)
  ])

  // Flatten into a single array, then remove duplicates
  const subjectIds = Array.from(new Set(allSubjectIds.flat()))

  setData(subjectIds)
}

function convertQueryStringToQueryObject (project, query = '') {
  const queryObject = {}

  return queryObject
}