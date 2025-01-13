import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import jsxA11y from "eslint-plugin-jsx-a11y"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import react from "eslint-plugin-react"
import reactCompiler from "eslint-plugin-react-compiler"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tailwind from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist", "app/components/ui", "build", ".react-router", "e2e"] },
  {
    files: ["app/**/*.{ts,tsx}", "server/**/*.{ts,tsx}"],
    settings: { react: { version: "18.3" } },
    extends: [
      js.configs.recommended,
      // ...tseslint.configs.recommended
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...tailwind.configs["flat/recommended"],
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.vite.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      "react-compiler": reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...jsxA11y.configs.strict.rules,

      "react-compiler/react-compiler": "error",

      // custom
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      ...eslintConfigPrettier.rules,
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    },
  }
)
