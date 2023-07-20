// General stuff
export const ZOONIVERSE_URL = 'https://www.zooniverse.org'

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

// Data fetch stuff
export const ASYNC_STATES = {
  READY: 'ready',
  FETCHING: 'fetching',
  ERROR: 'error'
}