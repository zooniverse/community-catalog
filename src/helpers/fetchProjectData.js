/*
Fetches a Zooniverse Project resource
Not to be confused with the project config in src/projects.json

Inputs:
- (string) projectId

Outputs:
- (object) Zooniverse Project resource.
 */

import { projects } from '@zooniverse/panoptes-js'

export default async function fetchProjectData (projectId) {
  if (!projectId) return

  try {
    const { body } = await projects.get({ id: projectId })
    const [ data ] = body.projects
    return data
  } catch (err) {
    console.error('fetchProjectData()', err)
    throw(err)
  }
}