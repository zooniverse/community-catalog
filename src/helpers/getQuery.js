/*
Gets ?query parameter from URL. Used to specify user search queries.
 */

export default function getQuery (url = window?.location?.search) {
  try {
    const param = new URLSearchParams(url)
    return param.get('query').trim() || undefined
  } catch (err) {
    return undefined
  }
}