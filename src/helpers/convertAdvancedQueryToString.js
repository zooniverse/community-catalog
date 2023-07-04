/*
Converts an advanced query object to a string.

- Example: { one: 'abc', two: '', three: '===' } should return
  "{one=abc} {three====}"
- Assumption: keys don't contain '='
 */

export default function convertAdvancedQueryToString (data) {
  return Object.entries(data).map(([key, val = '']) => {
    const _val = val.trim()  // TODO: what if val has { or } ?
    return (_val)
      ? `{${key}=${_val}}`
      : ''
  }).join(' ')
}
