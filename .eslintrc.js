module.exports = {
  settings: {
    react: {
      pragma: "React",
      version: "17.0.2",
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ["incrementPackageVersion.js", "webpack.config.js"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "google",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "new-cap": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
