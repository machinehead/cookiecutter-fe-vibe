// import js from "@eslint/js";
// import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import unusedImports from "eslint-plugin-unused-imports";
// import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  // {
  //   files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  //   plugins: { js },
  //   extends: ["js/recommended"],
  // },
  // {
  //   files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  //   languageOptions: { globals: { ...globals.browser, ...globals.node } },
  // },
  tseslint.configs.recommended,
  globalIgnores(["dist/*", "src/generated/*", "sst-env.d.ts"]),
  {
    // https://www.npmjs.com/package/eslint-plugin-unused-imports
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // or "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // TypeScript ESLint deprecation rule - https://typescript-eslint.io/rules/no-deprecated/
    files: ["**/*.{ts,tsx}"],
    ignores: ["sst.config.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
    },
  },
  {
    // Disable TypeScript rules for JavaScript files
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // TODO: enable and fix all complaints
  // TODO: afterwards, configure https://eslint.style/rules/js/padding-line-between-statements
  // stylistic.configs.customize({
  //   // the following options are the default values
  //   indent: 2,
  //   quotes: "double",
  //   semi: true,
  //   jsx: true,
  //   // ...
  // }),
  eslintConfigPrettier,
]);
