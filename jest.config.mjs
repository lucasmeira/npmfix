export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    testMatch: ['**/src/**/*.test.ts'], // Busca apenas testes na pasta src
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora dist e node_modules
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
