// General stuff
export const ZOONIVERSE_URL = 'https://www.zooniverse.org'
export const LANDING_PAGE_BACKGROUND_IMAGE_URL = 'https://panoptes-uploads.zooniverse.org/subject_location/53a29692-757d-4286-8816-0e6a87be9ed4.jpeg'

// Database stuff
export const DATABASE_URL = 'https://subject-set-search-api.zooniverse.org/'
export const DATABASE_NAME = 'projects'
export const TABLE_PREFIX = 'proj_'
export const SUBJECT_ID_KEY = 'subject_id'
export const KEYWORDS_KEY = '#keywords'
export const PAGE_SIZE = 10  // When fetching resources from Panoptes or the database, request this many items per page.

// Talk stuff
export const DEFAULT_AVATAR_URL = 'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png'

// Layout stuff
export const SUBJECT_IMAGE_SIZE = 186
export const LAYOUT_MAIN_MAX_WIDTH = 1280  // App's <main> element will not exceed this width.
export const NARROW_VIEW_WIDTH = 800  // At this width of below, we'll use a narrow (responsive mobile) view.
export const PROJECT_CARD_WIDTH = 222
export const PROJECT_CARD_HEIGHT = 265

export const DEFAULT_SUBJECT_VIEWER_WIDTH = 1000
export const DEFAULT_SUBJECT_VIEWER_HEIGHT = 500

// Data fetch stuff
export const ASYNC_STATES = {
  READY: 'ready',
  FETCHING: 'fetching',
  ERROR: 'error'
}