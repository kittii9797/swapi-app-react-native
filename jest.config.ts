import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'react-native',
  moduleNameMapper: {
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^@react-navigation/native-stack$': '<rootDir>/__mocks__/react-navigation-native-stack.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': ['ts-jest', { babelConfig: true }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo/vector-icons|expo-font|react-native-svg)',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest/setup.js',
  ],
  verbose: true,
  resetMocks: true,
  resetModules: false,
  restoreMocks: false,
  testEnvironment: 'jest-environment-jsdom',
  snapshotSerializers: [],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  watchPathIgnorePatterns: [],
  watchman: true,
};

export default config;
