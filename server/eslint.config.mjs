import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ),
  {
    plugins: [
      "@typescript-eslint",
      "prettier",
      "unused-imports",
      "simple-import-sort"
    ],
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting
      "no-unused-vars": "off", // Disable built-in ESLint rule
      "@typescript-eslint/no-unused-vars": "off", // Disable TypeScript rule
      "unused-imports/no-unused-imports": "error", // Auto-remove unused imports
      "simple-import-sort/imports": "error", // Sort imports automatically
      "simple-import-sort/exports": "error", // Sort exports automatically
      "sort-keys": ["error", "asc", { "caseSensitive": false, "natural": true }] // Sort object keys alphabetically
    }
  }
];
