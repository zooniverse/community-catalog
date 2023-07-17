/*
Checks if a Subject should be flagged for sensitive content

Inputs:
- (object) subject: Zooniverse subject resource
- (object) project: project config

Outputs:
- (bool) true if ANY of the Subject's metadata fields meets the project config's
  sensitive_content_conditions clauses. False by default.

For example, the following config will mark any subject that's red, blue,
sweet, or sour as "sensitive":

exampleProjectConfig = {
  sensitive_content_conditions: [
    { field: 'colour', values: ['red', 'blue' ] },
    { field: 'flavour', values: ['sweet', 'sour' ] },
  ]
}
 */


export default function checkForSensitiveContent (
  subject,
  project
) {
  if (!subject || !project) return false

  const metadata = subject.metadata || {}
  const conditions = project.sensitive_content_conditions || []

  for (let i = 0 ; i < conditions.length ; i ++) {
    const { field, values: valuesToCheckFor } = conditions[i]
    const metadataValue = metadata[field]
    if (valuesToCheckFor.includes(metadataValue)) return true
  }

  return false
}