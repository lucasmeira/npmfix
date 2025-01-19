import { readFileSync } from 'fs';

import { pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(readFileSync(new URL('./tsconfig.json', import.meta.url), 'utf-8'));

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    testMatch: ['**/test/**/*.test.ts'],
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
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
    verbose: true,
};
