// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/events/src/**/*.test.ts',
    '**/github-fetch/src/**/*.test.ts',
    '**/tests/**/*.test.ts',
  ]
};
