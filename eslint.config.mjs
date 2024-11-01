import globals from "globals";
import pluginJs from "@eslint/js";

import dwpConfigBase from "@dwp/eslint-config-base";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	{
		plugins: {
			dwpConfigBase,
		},
	},
];
