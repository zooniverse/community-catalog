/*
Fetches a Zooniverse Subject resource

Inputs:
- (string) subjectId
- (function) setData: callback function after successful data fetch

Outputs:
- (object) Zooniverse Subject resource.
 */

import { subjects } from '@zooniverse/panoptes-js'

export default async function fetchSubject (
  subjectId,
  setData = (data) => { console.log('fetchSubject: ', data) },
) {
  if (!subjectId) return

  try {
    const { body } = await subjects.get({ id: subjectId })
    const [ data ] = body.subjects
    setData(data)
  } catch (err) {
    console.error('ERROR: ', err)
    // TODO: handle errors
  }
}