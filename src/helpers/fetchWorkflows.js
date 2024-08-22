/*
Fetches multiple Zooniverse Workflow resource

Inputs:
- (array) list of workflowIds. Each ID is a string.

Outputs:
- (object) Zooniverse Workflow resource.
 */

import { panoptes } from '@zooniverse/panoptes-js'

export default async function fetchWorkflows (workflowIds = []) {
  if (workflowIds.length === 0) return

  try {
    const query = {
      fields: 'active,completeness,display_name',
      id: workflowIds.join(','),
    }
    const { body } = await panoptes.get('/workflows', query)
    return body.workflows

  } catch (err) {
    console.error('fetchWorkflows()', err)
    throw(err)
  }
}
