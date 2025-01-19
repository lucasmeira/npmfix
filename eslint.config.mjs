import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: {
                process: true,
                __dirname: true,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
            'unused-imports': unusedImports,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': ['error'],
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none' }],
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin'],
                        ['external'],
                        ['internal'],
                        ['parent', 'sibling', 'index'],
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'always',
                },
            ],

            'no-duplicate-imports': 'error',
            'no-import-assign': 'error',
            'no-restricted-imports': 'error',
            '@typescript-eslint/no-restricted-imports': 'error',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            'sort-imports': 'off',
            'lines-around-comment': ['error'],
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
                alias: {
                    map: [['@', './']],
                    extensions: ['.ts', '.js', '.jsx', '.tsx'],
                },
            },
        },
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        languageOptions: {
            globals: {
                jest: true,
                describe: true,
                it: true,
                expect: true,
            },
        },
        rules: {
            'no-undef': 'off',
        },
    },
];
