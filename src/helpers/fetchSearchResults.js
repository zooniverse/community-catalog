/*
Fetches search results from both Zooniverse Talk and the Subjects database.

Inputs:
- (string/int) projectId
- (string) query
  e.g. to search for Talk posts tagged with "#penguins", pass in queryString="penguins"
- (function) setData: callback function after successful data fetch

Outputs:
- Array of unique subject IDs (strings)
 */

import fetchSearchResults_fromTalk from './fetchSearchResults_fromTalk.js'
import fetchSearchResults_fromDatabase from './fetchSearchResults_fromDatabase.js'

export default async function fetchSearchResults (
  projectId,
  query = '',
  setData = (data) => { console.log('fetchSearchResults_fromTalk: ', data) }
) {

  const queryString = query
  const queryObject = {}

  const allSubjectIds = await Promise.all([
    fetchSearchResults_fromTalk(projectId, queryString),
    fetchSearchResults_fromDatabase(projectId, queryObject)
  ])

  // Flatten into a single array, then remove duplicates
  const subjectIds = Array.from(new Set(allSubjectIds.flat()))

  setData(subjectIds)
}
