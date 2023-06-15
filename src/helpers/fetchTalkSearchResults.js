/*
Fetches search results from Zooniverse Talk. Specifically, it searches for TAGs
(hashtags) in posts, for a specific project.

Inputs:
- (string/int) projectId
- (string) query: tag/hashtag to search for.
  e.g. to search for Talk posts tagged with "#penguins", pass in query="penguins"
- (function) setData: callback function after successful data fetch

Outputs:
- Array of Talk posts (Panoptes resource)
 */

import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchTalkSearchResults (
  projectId,
  query = '',
  setData = (data) => { console.log('fetchTalkSearchResults: ', data) }
) {
  if (!projectId) return

  // Example: https://talk.zooniverse.org/tags/popular?http_cache=true&page=1&taggable_type=Subject&section=project-7929&name=flares
  try {
    const response = await talkAPI.get('/tags/popular', {
      section: `project-${projectId}`,
      taggable_type: 'Subject',
      page: 1,
      page_size: 20,
      name: query
    })

    if (!response?.ok) throw new Error('Couldn\'t fetch tag search results')

    const results = response.body?.popular || []
    setData(results)

  } catch (err) {
    console.error(err)
    // TODO: handle errors
  }
}
