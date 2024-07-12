const config = {
  'moduleNameMapper': {
    // Maps all media files to a mock file.
    // Without this, test will crash with a "Jest encountered an unexpected token" due to Jest having no idea what to do with binary files.
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/mockMediaFile.js',

    // Maps the @src alias added in webpack.
    '^@src/(.*)$': '<rootDir>/src/$1'
  },

  // Tells Jest to look for unit test files in the /src directory.
  'roots': [
    '<rootDir>/src'
  ],

  'setupFilesAfterEnv': [
    '<rootDir>/jest/jest-setup.js'
  ],

  // Without this, render() will result in "document is not defined" errors.
  'testEnvironment': 'jsdom',
}

// Jest doesn't like 'export' (i.e. ES6 modules), so we use module.exports (CommonJS modules).
// Probably because it's running in Node.js.
module.exports = config