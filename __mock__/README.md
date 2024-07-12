# Jest Mocks

This folder contains modules mocked for Jest tests.

If one of our components has `import { banana } from 'fruitlist'`, and that fruitlist module is complex, server-reliant, or otherwise borking our tests, then expect to find a `fruitlist.js` file in here.

Additional notes (accurate as of Jest 29.6.4):

- The `__mock__` folder is _implicit_ to Jest: https://jestjs.io/docs/manual-mocks
- The `__mock__` folder can handle scoped modules, e.g. `@zooniverse/panoptes-js`, by using subfolders.
- However, if the `import` command is pulling from _subfolders,_ then the `__mock__` folder doesn't seem to function as well. See `App.spec.js` for how it handles `import auth from 'panoptes-client/lib/auth'` using `jest.mock('panoptes-client/lib/auth', ...)`