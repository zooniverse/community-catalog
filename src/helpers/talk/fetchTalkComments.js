import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchTalkComments(subject) {
  const projectId = subject?.links?.project
  if (!subject || !projectId) return []

  const query = {
    section: `project-${projectId}`,
    focus_id: subject.id,
    focus_type: 'Subject',
    page: 1,
    sort: 'created_at',  // Use '-created_at' to sort in reverse order.
  }

  return talkAPI.get('/comments', query)
    .then(response => response?.body?.comments || [])
}
