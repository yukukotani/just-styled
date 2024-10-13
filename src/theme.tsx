import type { FC, PropsWithChildren } from "react";
import React from "react";
import type { ConfigSchema } from "./config";
import { resolvePropertyValue } from "./sheet";
import { toKebabCase } from "./utils";

export const ThemeProvider: FC<PropsWithChildren<{ config: ConfigSchema }>> = ({
	config,
	children,
}) => {
	const sheet = generateThemeSheets(config);

	return (
		<>
			<style precedence="theme" href="theme">
				{sheet}
			</style>
			{children}
		</>
	);
};

function generateThemeSheets(config: ConfigSchema) {
	if (config.tokens == null) {
		return "";
	}
	const properties: string[] = [];
	for (const key in config.tokens.colors) {
		properties.push(
			`${transformTokenToCssVariable(key, "colors")}: ${resolvePropertyValue(config.tokens.colors[key])};`,
		);
	}

	return `:root { ${properties.join(" ")} }`;
}

export function transformTokenToCssVariable(token: string, category?: string) {
	const t = toKebabCase(token).replaceAll(".", "-");
	return `--j${category ? `-${category}-` : "-"}${t}`;
}
