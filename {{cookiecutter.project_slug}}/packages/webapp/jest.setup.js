// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.cjs`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Add TextDecoder polyfill for Neon adapter compatibility
import { TextDecoder, TextEncoder } from "util";
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

// Mock DATABASE_URL for tests
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test";
