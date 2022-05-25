module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  testRegex: "(/.*\\.test)\\.(ts|tsx)$",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
