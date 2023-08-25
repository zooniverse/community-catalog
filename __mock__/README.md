# Jest Mocks

This folder contains modules mocked for Jest tests.

If one of our components has `import { banana } from 'fruitlist'`, and that fruitlist module is complex, server-reliant, or otherwise borking our tests, then expect to find a `fruitlist.js` file in here.

The `__mock__` folder is _implicit_ to Jest: https://jestjs.io/docs/manual-mocks