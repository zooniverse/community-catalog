/*
Gets ?query parameter from URL. Used to specify user search queries.
 */

export default function getQuery () {
  try {
    const param = new URLSearchParams(window?.location?.search)
    return param.get('query').trim() || undefined
  } catch (err) {
    return undefined
  }
}