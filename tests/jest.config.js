export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  transform: {},
  moduleNameMapper: {
    "^../../middleware/auth.middleware.js$":
      "<rootDir>/tests/__mocks__/auth.middleware.js",
  },
};
