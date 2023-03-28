import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchKeywords (
  setData = (data) => { console.log('fetchKeywords: ', data) }
) {
  // Example: https://talk.zooniverse.org/tags/popular?http_cache=true&section=project-12268&limit=20&page_size=20
  try {
    const response = await talkAPI.get('/tags/popular', {
      section: 'project-12268',  // Scarlets & Blues ; requires ?env=production
      page: 1,
      page_size: 20,
    })

    if (!response?.ok) throw new Error('Couldn\'t fetch keywords')

    const keywords = response.body?.popular || []
    setData(keywords)

  } catch (err) {
    console.error(err)
    // TODO: handle errors
  }
}
