export type ConfigSchema = {
	tokens?: {
		[K in TokenKind]: Record<string, TokensConfigValue>;
	};
};

type TokenKind = "colors" | "spaces" | "sizes" | "fontSizes" | "radii";
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
