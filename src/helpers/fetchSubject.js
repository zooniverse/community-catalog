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