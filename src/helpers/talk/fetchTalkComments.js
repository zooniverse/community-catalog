import { talkAPI } from '@zooniverse/panoptes-js'
import { PAGE_SIZE } from '@src/config.js'

export default async function fetchTalkComments(subject, page = 1) {
  const projectId = subject?.links?.project
  if (!subject || !projectId) return []

  const query = {
    section: `project-${projectId}`,
    focus_id: subject.id,
    focus_type: 'Subject',
    page: page,
    page_size: PAGE_SIZE,
    sort: 'created_at',  // Use '-created_at' to sort in reverse order.
  }

  return talkAPI.get('/comments', query)
    .then(response => {
      console.log('+++ response', response)
      const comments = response?.body?.comments || []
      const pageSize = response?.body?.meta?.comments?.page_size || 1
      const totalComments = response?.body?.meta?.comments?.count || 1
      return { comments, pageSize, totalComments }
    })
}
