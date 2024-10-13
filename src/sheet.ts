import fnv1a from "@sindresorhus/fnv1a";
import type { CSSProperties } from "react";
import { transformTokenToCssVariable } from "./theme";
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
			const value = transformValue(rawValue);
			sheets.push({
				className: className,
				css: `.${className} { ${key}: ${value}; }`,
			});
		}
	}

	return sheets;
}

function transformValue(value: unknown) {
	if (typeof value === "string" && value.startsWith("$")) {
		const cssVariableName = transformTokenToCssVariable(value.slice(1));
		return `var(${cssVariableName})`;
	}

	return String(value);
}
