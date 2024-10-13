export type ConfigSchema = {
	tokens?: {
		colors: Record<string, TokensConfigValue>;
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
	: Record<string, unknown>;

export type Tokens<Kind extends string> = TokensConfig extends Record<
	Kind,
	Record<string, unknown>
>
	? keyof TokensConfig[Kind]
	: never;
