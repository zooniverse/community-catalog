/*
Fetches keywords (Talk tags) from a project, or from a specific Subject in that project.

Inputs:
- (string) projectId
- (number) page
- (optional) (object) subject: Zooniverse Subject resource.
  Specify only if we want tags for that specific Subject.
  Otherwise, this function will pull tags for the project as a whole.

Outputs:
- Array of tags (Zooniverse resource object), ordered by most popular to least.
 */

import { talkAPI } from '@zooniverse/panoptes-js'
import { PAGE_SIZE } from '@src/config.js'

export default async function fetchKeywords (
  projectId,
  page = 1,
  subject = undefined,
) {
  if (!projectId) return

  // Examples:
  // - Fetch all popular keywords for a project: https://talk.zooniverse.org/tags/popular?http_cache=true&section=project-12268&limit=20&page_size=20
  // - Fetch all keywords for a specific subject: https://talk.zooniverse.org/tags/popular?http_cache=true&section=project-12268&limit=20&page_size=20&taggable_type=Subject&taggable_id=69734873
  try {
    const options = {
      section: `project-${projectId}`,
      page,
      page_size: PAGE_SIZE,
    }

    if (subject) {
      options['taggable_type'] = 'Subject'
      options['taggable_id'] = subject.id
    }

    const response = await talkAPI.get('/tags/popular', options)

    if (!response?.ok) throw new Error('Couldn\'t fetch keywords')

    const keywords = response.body?.popular || []
    return keywords

  } catch (err) {
    console.error(err)
    throw(err)
    // TODO: handle errors
  }
}
