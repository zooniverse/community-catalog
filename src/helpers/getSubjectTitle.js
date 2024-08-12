/*
Gets the title or description of a Subject. This assumes that the Subject has a
title or short description of itself in its metadata.

Inputs:
- (object) subject
- (string) title field (the name of metadata field which contains a title or short description)
- (boolean, optional) ignore case (default: true)
  - this is particularly useful if the Subjects in a project don't use a consistent 

Outputs:
- (string) title of the Subject
 */

export default function getSubjectTitle(subject, titleField, ignoreCase = true) {
  if (!subject || !subject.metadata || !titleField) return ''

  if (ignoreCase) {
    let title = ''
    Object.entries(subject.metadata).forEach(([key, val]) => {
      if (key.toLowerCase?.() === titleField?.toLowerCase?.()) {
        title = val
      }
    })
    return title

  } else {
    return subject.metadata[titleField] || ''
  }
}