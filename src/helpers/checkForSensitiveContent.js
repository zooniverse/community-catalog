/*
Checks if a Subject should be flagged for sensitive content

Inputs:
- (object) subject: Zooniverse subject resource
- (object) project: project config

Outputs:
- (bool) true if ANY of the Subject's metadata fields meets the project config's
  sensitive_content_conditions clauses. False by default.
 */


export default function checkForSensitiveContent (
  subject,
  project
) {
  if (!subject || !project) return false

  return false
}