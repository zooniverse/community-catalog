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
import fetchRandomSubjects from './fetchRandomSubjects.js'

export default async function fetchSearchResults (
  project,
  query = '',
  page = 1,
) {

  if (!project) throw new Error('fetchSearchResults() requires a project')
  
  if (!query.trim()) {
    // The default query simply results in a random 

    const subjectIds = await fetchRandomSubjects(project.id)
    return subjectIds

  } else {
    // A simple query searches for a common value across all fields.
    
    const queryForTalk = query
    const queryForDatabase = applyQueryToRelevantDatabaseFields(project, query)

    const allSubjectIds = await Promise.all([
      fetchSearchResults_fromTalk(project.id, queryForTalk, page),
      fetchSearchResults_fromDatabase(project.id, queryForDatabase, page)
    ])
  
    // // Flatten into a single array, then remove duplicates
    // const subjectIds = Array.from(new Set(allSubjectIds.flat()))

    return allSubjectIds.flat()
  }
}

function applyQueryToRelevantDatabaseFields (project, query = '') {
  if (!project) return {}

  const queryObject = {}
  const fieldsToSearch = project.metadata_fields_to_search_for_keywords || project.metadata_fields || []
  fieldsToSearch.map(field => (
    queryObject[field] = query
  ))

  return queryObject
}