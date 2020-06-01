module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["get-off-my-lawn"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "react/prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-no-literals": 0,
    "react/display-name": 0,
    "react/no-unescaped-entities": 0,
    "sort-keys": 0,
    "objects/no-object-properties-one-line": 0,
    "node/no-unpublished-require": 0,
    "max-classes-per-file": ["error", 2],
    "require-unicode-regexp": 0,
    camelcase: [
      "error",
      {
        allow: [
          "client_email",
          "client_id",
          "private_key",
          "project_id",
          "email_address",
        ],
      },
    ],
  },
};
