import '@testing-library/jest-dom'  // Import various matchers for DOM test, e.g. `expect(headerElement).toBeInTheDocument()`

// whatwg-url expects TextDecoder and TextEncoder to be available globally.
import { TextDecoder, TextEncoder } from 'util';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
