import { act, render, screen } from '@testing-library/react'
import SubjectImage from './SubjectImage.js'

// Example data
const exampleSubject_87892456 = {
  id: '87892456',
  locations: [
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/66fd834d-b13a-40f0-b97d-6d364841d56c.jpeg' },
    { 'image/jpeg': 'https://panoptes-uploads.zooniverse.org/subject_location/39c77068-22eb-472d-b280-1af9e2f33437.jpeg' }
  ]
}

// mock Panoptes module
jest.mock('@zooniverse/panoptes-js', () => {
  return {
    subjects: {
      get: ({ id }) => {
        if (id === '87892456') {
          const mockResponse = {
            body: {
              subjects: [ exampleSubject_87892456 ]
            },
            ok: true,
            status: 200,
            statusCode: 200,
          }

          return Promise.resolve(mockResponse)
        }
        return Promise.resolve(null)
      }
    }
  }
})

describe.only('SubjectImage', function () {
  test('should render an image, when given a subject', function () {
    render(
      <SubjectImage
        subject={exampleSubject_87892456}
      />
    )

    // For multi-image subjects, SubjectImage will render the FIRST image.
    expect(screen.getByRole('img')).toHaveProperty('alt', 'Preview image for Subject 87892456')
    expect(screen.getByRole('img')).toHaveProperty('src', 'https://panoptes-uploads.zooniverse.org/subject_location/66fd834d-b13a-40f0-b97d-6d364841d56c.jpeg')
  })
  
  /*
  TODO: this isn't working, as the SubjectImage seems to continue updating outside the act()
  Perhaps we need to implement useSWR (https://github.com/zooniverse/community-catalog/pull/131) (to avoid using setState in useEffect), or look into other patterns that handle async calls.
  (@shaunanoordin 20230826)

  test('should render an image, when given a subject ID', function () {
    act(() => {
      render(
        <SubjectImage
          subjectId='87892456'
        />
      )
    })

    // For multi-image subjects, SubjectImage will render the FIRST image.
    expect(screen.getByRole('img')).toHaveProperty('alt', 'Preview image for Subject 87892456')
    expect(screen.getByRole('img')).toHaveProperty('src', 'https://panoptes-uploads.zooniverse.org/subject_location/66fd834d-b13a-40f0-b97d-6d364841d56c.jpeg')
  })
  /**/

  test('should render a placeholder image, when given no subject', function () {
    render(
      <SubjectImage />
    )

    const svg = screen.getByLabelText('Placeholder for Subject image')
    expect(svg).toBeDefined()

    const path = svg.querySelector('path')
    expect(path).toHaveAttribute('d', 'M1 3h22v18H1V3zm5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm17 6-5-6-6 7-3-3-8 8')
    expect(path).toHaveAttribute('fill', 'none')
    expect(path).toHaveAttribute('stroke', '#000')
    expect(path).toHaveAttribute('stroke-width', '2')
  })
})
