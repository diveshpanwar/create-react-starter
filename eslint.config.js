import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
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
];
