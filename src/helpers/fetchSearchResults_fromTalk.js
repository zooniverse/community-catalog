/*
Fetches search results from Zooniverse Talk. Specifically, it searches for TAGs
(hashtags) in posts, for a specific project.

Inputs:
- (string/int) projectId
- (string) queryString: tag/hashtag to search for.
  e.g. to search for Talk posts tagged with "#penguins", pass in queryString="penguins"

Outputs:
- Array of subject IDs (strings)
 */

import { talkAPI } from '@zooniverse/panoptes-js'
import { PAGE_SIZE } from '@src/config.js'

export default async function fetchSearchResults_fromTalk (
  projectId,
  queryString = '',
  page = 1
) {
  if (!projectId) return []

  // Example: https://talk.zooniverse.org/tags/popular?http_cache=true&page=1&taggable_type=Subject&section=project-7929&name=flares
  try {
    const response = await talkAPI.get('/tags/popular', {
      section: `project-${projectId}`,
      taggable_type: 'Subject',
      page,
      page_size: PAGE_SIZE,
      name: queryString
    })

    if (!response?.ok) throw new Error('Couldn\'t fetch Talk search results')

    let results = response.body?.popular || []
    return results.map(item => item.taggable_id?.toString() || '') || []

  } catch (err) {
    console.error(err)
    throw(err)
    // TODO: handle errors
  }
}
