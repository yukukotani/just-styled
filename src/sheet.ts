import fnv1a from "@sindresorhus/fnv1a";
import type { CSSProperties } from "react";

type Sheet = {
	className: string;
	css: string;
};

export function generateSheets(props: CSSProperties) {
	const sheets: Sheet[] = [];

	for (const [key, value] of Object.entries(props)) {
		if (value != null && value !== "") {
			const kebab = toKebabCase(key);

			const hash = fnv1a(`${key}${value}`, { size: 32 })
				.toString(36)
				.slice(0, 4);
			// appends prefix to avoid a leading number which is invalid as a className
			const className = `j${hash}`;

			sheets.push({
				className: className,
				css: `.${className} { ${kebab}: ${value}; }`,
			});
		}
	}

	return sheets;
}

function toKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
