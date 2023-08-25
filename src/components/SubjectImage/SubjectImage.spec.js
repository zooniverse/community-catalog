import { render, screen } from '@testing-library/react'
import SubjectImage from './SubjectImage.js'

// mock Panoptes module
jest.mock('@zooniverse/panoptes-js', () => {
  return {
    __esModule: true,
    subjects: {
      get: (subjectId) => {
        console.log('+++ xxx', subjectId)
        return Promise.resolve(null)
      }
    }
  }
})

describe('Subject Image', function () {
  test('should render subject image, when given a specific subject', async function () {
    render(
      <SubjectImage
        subject={{
          id: '87892456',
          locations: [
            { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/66fd834d-b13a-40f0-b97d-6d364841d56c.jpeg' },
            { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/39c77068-22eb-472d-b280-1af9e2f33437.jpeg' }
          ]
        }}
      />
    )
  })
})
