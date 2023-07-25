import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchTalkComments(subject, page = 1) {
  const projectId = subject?.links?.project
  if (!subject || !projectId) return []

  const query = {
    section: `project-${projectId}`,
    focus_id: subject.id,
    focus_type: 'Subject',
    page: page,
    sort: 'created_at',  // Use '-created_at' to sort in reverse order.
  }

  return talkAPI.get('/comments', query)
    .then(response => {
      const comments = response?.body?.comments || []
      const maxPage = response?.body?.meta?.comments?.page_count || 1
      return { comments, maxPage }
    })
}
