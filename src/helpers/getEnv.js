export default function getEnv () {
  try {
    const param = new URLSearchParams(window?.location?.search)
    return param.get('env') || undefined
  } catch (err) {
    return undefined
  }
}