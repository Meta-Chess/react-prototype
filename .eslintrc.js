module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    extraFileExtensions: [".json"],
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          String: {
            message: "Use string instead",
            fixWith: "string",
          },
          "{}": false,
        },
      },
    ],
    "no-console": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};