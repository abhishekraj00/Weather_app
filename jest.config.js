const { resolve } = require("path");

module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/file-mock.js",

    "\\.(jpg|png|gif|svg)$": "<rootDir>/__mocks__/file-mock.js",
  },

  roots: ["<rootDir>/src"],
  testMatch: ["<rootDir>/**/*.test.ts", "<rootDir>/**/*.test.tsx"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};
