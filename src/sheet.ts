import fnv1a from "@sindresorhus/fnv1a";
import type { ConfigSchema } from "./config";
import type { StyleProps } from "./style-props";
import { toKebabCase } from "./utils";

type Sheet = {
	className: string;
	css: string;
};

export function generateSheets(props: StyleProps, selector = "", atRule = "") {
	const sheets: Sheet[] = [];

	for (const [rawKey, rawValue] of Object.entries(props)) {
		if (rawValue != null && rawValue !== "") {
			if (typeof rawValue === "object") {
				const nestedSheets = rawKey.startsWith("@")
					? generateSheets(rawValue, selector, rawKey) // At rules (media query)
					: generateSheets(rawValue, selector + rawKey, atRule); // Selectors
				sheets.push(...nestedSheets);
				continue;
			}

			const hash = fnv1a(`${rawKey}${rawValue}${selector}`, { size: 32 })
				.toString(36)
				.slice(0, 4);
			// appends prefix to avoid a leading number which is invalid as a className
			const className = `j${hash}`;

			const key = toKebabCase(rawKey);
			const value = resolvePropertyValue(rawValue);
			const rule = `.${className}${selector} { ${key}: ${value}; }`;
			sheets.push({
				className: className,
				css: atRule ? `${atRule}{ ${rule} }` : rule,
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
