module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(spec))\\.ts?$",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/extensions/",
    "<rootDir>/src/__tests__/testHelpers.ts",
  ],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "@sentrei/types/(.*)": "<rootDir>/../@types/src/$1",
    "@sentrei/common/(.*)": "<rootDir>/../common/src/$1",
    "@sentrei/functions/(.*)": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  verbose: true,
  collectCoverageFrom: [
    "**/*.{js,ts}",
    "!**/*.d.ts",
    "!**/*.spec.{ts}",
    "!**/node_modules/**",
  ],
  globals: {
    "ts-jest": {
      importHelpers: true,
      tsConfig: "<rootDir>/tsconfig.test.json",
    },
  },
};
