import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      quotes: ["error", "double"],
    },
    ignores: [
      "node_modules/*",
      ".github/*",
      ".vscode/*",
      "snippets/*",
      "template/*",
      "folderStructure/*",
    ],
  },
  pluginJs.configs.recommended,
  prettier,
];
