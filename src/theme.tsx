import type { FC, PropsWithChildren } from "react";
import React from "react";
import { toKebabCase } from "./utils";

export type ThemeInput = {
	tokens: Tokens;
};
type Tokens = {
	colors: Record<string, TokenValue>;
};
type TokenValue = string | { dark: string; light: string };

export const ThemeProvider: FC<PropsWithChildren<{ theme: ThemeInput }>> = ({
	theme,
	children,
}) => {
	const sheet = generateThemeSheets(theme);

	return (
		<>
			<style precedence="theme" href="theme">
				{sheet}
			</style>
			{children}
		</>
	);
};

function generateThemeSheets(theme: ThemeInput) {
	const properties: string[] = [];
	for (const key in theme.tokens.colors) {
		properties.push(
			`${getCustomPropertyName("colors", key)}: ${theme.tokens.colors[key]};`,
		);
	}

	return `:root { ${properties.join(" ")} }`;
}

function getCustomPropertyName(category: string, key: string) {
	return `--j-${category}-${toKebabCase(key)}`;
}
