module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "./.eslintrc-auto-import.json",
  ],
  parser: "vue-eslint-parser",
  plugins: ["prettier", "vue"],
  ignorePatterns: ["public/*"],
  rules: {
    "vue/experimental-script-setup-vars": "off",
    "vue/component-definition-name-casing": "off",
    "vue/name-property-casing": "off",
    "vue/component-name-in-template-casing": "off",
    "vue/multi-word-component-names": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
