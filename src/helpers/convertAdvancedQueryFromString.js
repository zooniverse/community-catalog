/*
Converts an advanced query string to an object.

- Example: "{one=abc} {two=} {three====}" should return
  { one: 'abc', three: '===' }
- Assumption: keys don't contain '='
 */

export default function convertAdvancedQueryFromString (str = '') {
  const data = {}
  str.match(/{[^{}=]+=[^{}]*}/g)?.forEach(item => {
    const match = item.match(/^{([^=]+)=(.*)}$/)  // Don't use global (g)
    if (match?.[1] && match?.[2]) {  // match[1] is the key, match[2] is the value
      data[match[1]] = match[2]
    }
  })
  return data
}