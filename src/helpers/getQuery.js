export default function getQuery() {
  try {
    const param = new URLSearchParams(window?.location?.search)
    return param.get('query') || undefined
  } catch (err) {
    return undefined
  }
}