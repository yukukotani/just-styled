import { defineConfig } from "just-styled";

export const config = defineConfig({
	tokens: {
		colors: {
			"gray.500": "red",
		},
	},
});

type UserConfig = typeof config;
declare module "just-styled" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface JustStyledConfig extends UserConfig {}
}
