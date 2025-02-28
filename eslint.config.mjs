import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef":"error",
      "no-console":"warn",
      "no-unused-expressions":"error",
      "prefer-const":"error",
  },

  ignores: ["**/node_modules/", "./dist"],


    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];