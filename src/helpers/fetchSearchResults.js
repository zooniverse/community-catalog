/*
Fetches search results from Zooniverse Talk. Specifically, it searches for TAGs
(hashtags) in posts, for a specific project.

Inputs:
- (string/int) projectId
- (string) query
  e.g. to search for Talk posts tagged with "#penguins", pass in queryString="penguins"
- (function) setData: callback function after successful data fetch

Outputs:
- Array of subject IDs (strings)
 */

import fetchTalkSearchResults from './fetchTalkSearchResults.js'
import fetchDatabaseSearchResults from './fetchDatabaseSearchResults.js'

export default async function fetchSearchResults (
  projectId,
  query = '',
  setData = (data) => { console.log('fetchTalkSearchResults: ', data) }
) {

  const queryString = query
  const queryObject = {}

  const allSubjectIds = await Promise.all([
    fetchTalkSearchResults(projectId, queryString),
    fetchDatabaseSearchResults(projectId, queryObject)
  ])

  // Flatten into a single array, then remove duplicates
  const subjectIds = Array.from(new Set(allSubjectIds.flat()))

  setData(subjectIds)
}