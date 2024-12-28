export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    testMatch: ['**/test/**/*.test.ts'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!dist/**/*.test.js'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};
