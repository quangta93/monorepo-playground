module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: ["node_modules/(?!@local)"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
    },
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "~/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
}
