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
    /**
     * This does three things:
     * 1. Enables eslint-plugin-prettier.
     * 2. Sets the prettier/prettier rule to "error".
     * 3. Extends the eslint-config-prettier configuration.
     * @ref https://github.com/prettier/eslint-plugin-prettier
     */
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  parser: "vue-eslint-parser",
  plugins: ["prettier", "vue"],
  ignorePatterns: ["public/*"],
  // add your custom rules here
  rules: {
    'vue/experimental-script-setup-vars': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/name-property-casing': 'off',
    'vue/name-property-casing': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
