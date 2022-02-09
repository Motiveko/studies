export default {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/**/*.spec.(ts|tsx)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  // preset: 'ts-jest',
};
