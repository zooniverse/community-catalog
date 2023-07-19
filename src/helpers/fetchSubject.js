/*
Fetches a Zooniverse Subject resource

Inputs:
- (string) subjectId

Outputs:
- (object) Zooniverse Subject resource.
 */

import { subjects } from '@zooniverse/panoptes-js'

export default async function fetchSubject (subjectId) {
  if (!subjectId) return

  try {
    const { body } = await subjects.get({ id: subjectId })
    const [ data ] = body.subjects
    return data
  } catch (err) {
    console.error(err)
    throw(err)
  }
}