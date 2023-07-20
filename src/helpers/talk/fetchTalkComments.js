import { talkAPI } from '@zooniverse/panoptes-js'

export default async function fetchTalkComments(subject) {
  if (!subject?.project) return []

  const query = {
    section: `project-${subject.project.id}`,
    focus_id: subject.id,
    focus_type: 'Subject',
    page: 1,
    sort: 'created_at',  // PFE used '-created_at' to sort in reverse order, and I have no idea why.
  }

  return talkAPI.get('/comments', query)
    .then(response => response?.body?.comments || [])
}
