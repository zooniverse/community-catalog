/*
Gets ?env parameter from URL. Used for dev purposes.
 */

export default function getEnv () {
  try {
    const param = new URLSearchParams(window?.location?.search)
    return param.get('env') || undefined
  } catch (err) {
    return undefined
  }
}