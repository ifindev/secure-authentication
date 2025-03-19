export default [
    {
        ignores: ['node_modules', 'dist'], // ✅ Keep only necessary ignores
    },
    {
        files: ['src/**/*.ts', 'src/**/*.tsx', 'server/**/*.ts'], // ✅ Ensure ESLint runs on these files
        languageOptions: {
            parser: (await import('@typescript-eslint/parser')).default,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
            'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
            'unused-imports': (await import('eslint-plugin-unused-imports')).default,
            prettier: (await import('eslint-plugin-prettier')).default,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
            'prettier/prettier': 'error',
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': 'error',
            'unused-imports/no-unused-imports': 'error',
        },
    },
];
