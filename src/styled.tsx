import type { CSSProperties, ComponentProps, ElementType } from "react";
import React from "react";
import { generateSheets } from "./sheet";

export function styled<C extends ElementType<{ className?: string }>>(
	Component: C,
	props: CSSProperties,
) {
	const sheets = generateSheets(props);
	const className = sheets.map((s) => s.className).join(" ");

	return (props: ComponentProps<C>) => {
		return (
			<>
				{sheets.map((s) => (
					<style key={s.className} href={s.className} precedence="medium">
						{s.css}
					</style>
				))}
				{/* @ts-expect-error */}
				<Component {...props} className={className} />
			</>
		);
	};
}
