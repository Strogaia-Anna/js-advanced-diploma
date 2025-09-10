import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  // { files: ['**/*/*.test.js'], plugins: { 'jest' }, extends: ['jest/recommended'], rules: { 'jest/prefer-expect-assertions': 'off' } },
  pluginReact.configs.flat.recommended,
]);
