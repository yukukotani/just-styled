export type ConfigSchema = {
	tokens?: {
		/**
		 * tokens for color properties such as `color` or `backgroundColor`
		 */
		colors?: Record<string, TokensConfigValue>;
		/**
		 * Tokens for space properties such as `margin` or `gap`
		 */
		spaces?: Record<string, TokensConfigValue>;
		/**
		 * Tokens for size properties such as `width` or `height`
		 */
		sizes?: Record<string, TokensConfigValue>;
		/**
		 * Tokens for `fontSize` property
		 */
		fontSizes?: Record<string, TokensConfigValue>;
		/**
		 * Tokens for `borderRadius` property
		 */
		radii?: Record<string, TokensConfigValue>;
	};
};

type TokensConfigValue = string;

// biome-ignore lint/suspicious/noEmptyInterface: This is to be overridden in user's theme config.
export interface JustStyledConfig {}

export function defineConfig<const T extends ConfigSchema>(config: T) {
	return config;
}

type TokensConfig = JustStyledConfig extends Record<"tokens", unknown>
	? JustStyledConfig["tokens"]
	: undefined;

export type Tokens<Kind extends string> = TokensConfig extends Record<
	Kind,
	Record<infer T, unknown>
>
	? T
	: never;
