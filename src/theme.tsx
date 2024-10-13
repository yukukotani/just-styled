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
	for (const kind in config.tokens) {
		const tokens = config.tokens[kind as keyof typeof config.tokens];
		for (const token in tokens) {
			properties.push(
				`${transformTokenToCssVariable(token, kind)}: ${resolvePropertyValue(tokens[token])};`,
			);
		}
	}

	return `:root { ${properties.join(" ")} }`;
}

export function transformTokenToCssVariable(token: string, kind?: string) {
	const t = toKebabCase(token).replaceAll(".", "-");
	return `--j${kind ? `-${kind}-` : "-"}${t}`;
}
