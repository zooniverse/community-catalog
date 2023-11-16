import '@testing-library/jest-dom'  // Import various matchers for DOM test, e.g. `expect(headerElement).toBeInTheDocument()`

/*
whatwg-url expects Node's TextDecoder and TextEncoder to be available globally.
They aren't defined in the `jsdom` environment, so patch them here.
https://github.com/jsdom/whatwg-url/issues/197
*/
import { TextDecoder, TextEncoder } from 'util';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
