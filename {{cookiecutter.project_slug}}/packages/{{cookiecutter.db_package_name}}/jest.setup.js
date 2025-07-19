const { TextDecoder, TextEncoder } = require("util");

// Mock DATABASE_URL for tests
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test";

// Mock other environment variables that might be required
process.env.NODE_ENV = "test";

// Add TextDecoder polyfill for Node.js compatibility
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
