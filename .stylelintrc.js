module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-prettier/recommended",
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extends", "tailwind"],
      },
    ],
    "block-no-empty": null,
  },
};
