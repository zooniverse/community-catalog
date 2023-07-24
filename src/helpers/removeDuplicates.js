/*
Removes duplicates from an array.

Input:
- (array) array: usually an array of strings, for comparison purposes.

Outut:
- Original array, minus duplicates

Example:
- Input: ['apple', 'banana', 'apple']
- Output: ['apple', 'banana']
 */

export default function removeDuplicates (array) {
  if (!array) return
  return Array.from(new Set(array))
}