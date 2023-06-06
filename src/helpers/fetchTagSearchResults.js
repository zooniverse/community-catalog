import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchTagSearchResults (
  projectId = '',
  query = '',
  setData = (data) => { console.log('fetchTagSearchResults: ', data) }
) {
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
