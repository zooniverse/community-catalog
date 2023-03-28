import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchKeywords ({
  setData = (data) => { console.log('fetchKeywords: ', data) },
  subject = undefined,
}) {
  // Examples:
  // - Fetch all popular keywords for a project: https://talk.zooniverse.org/tags/popular?http_cache=true&section=project-12268&limit=20&page_size=20
  // - Fetch all keywords for a specific subject: https://talk.zooniverse.org/tags/popular?http_cache=true&section=project-12268&limit=20&page_size=20&taggable_type=Subject&taggable_id=69734873
  try {
    const options = {
      section: 'project-12268',  // Scarlets & Blues ; requires ?env=production
      page: 1,
      page_size: 20,
    }

    if (subject) {
      options['taggable_type'] = 'Subject'
      options['taggable_id'] = subject.id
    }

    const response = await talkAPI.get('/tags/popular', options)

    if (!response?.ok) throw new Error('Couldn\'t fetch keywords')

    const keywords = response.body?.popular || []
    setData(keywords)

  } catch (err) {
    console.error(err)
    // TODO: handle errors
  }
}
