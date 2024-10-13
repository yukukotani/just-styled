import fnv1a from "@sindresorhus/fnv1a";
import type { CSSProperties } from "react";
import type { ConfigSchema } from "./config";
import { toKebabCase } from "./utils";

type Sheet = {
	className: string;
	css: string;
};

export function generateSheets(props: CSSProperties) {
	const sheets: Sheet[] = [];

	for (const [rawKey, rawValue] of Object.entries(props)) {
		if (rawValue != null && rawValue !== "") {
			const hash = fnv1a(`${rawKey}${rawValue}`, { size: 32 })
				.toString(36)
				.slice(0, 4);
			// appends prefix to avoid a leading number which is invalid as a className
			const className = `j${hash}`;

			const key = toKebabCase(rawKey);
			const value = resolvePropertyValue(rawValue);
			sheets.push({
				className: className,
				css: `.${className} { ${key}: ${value}; }`,
			});
		}
	}

	return sheets;
}

export function generateThemeSheets(config: ConfigSchema) {
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

export function resolvePropertyValue(value: unknown) {
	if (typeof value === "string" && value.startsWith("$")) {
		const cssVariableName = transformTokenToCssVariable(value.slice(1));
		return `var(${cssVariableName})`;
	}

	return String(value);
}
