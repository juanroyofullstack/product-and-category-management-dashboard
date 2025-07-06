import type { Config } from 'jest';
import nextJest from 'next/jest.js';
 
const createJestConfig = nextJest({
    dir: './',
});
 
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.(css|sass|scss)$': '<rootDir>/_mocks_/styleMock.js',
        '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/fileMock.js',
    },
};
 
export default createJestConfig(config);