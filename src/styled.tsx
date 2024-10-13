/// <reference types="react/canary" />

import type { ComponentProps, ElementType } from "react";
import React from "react";
import { generateSheets } from "./sheet";
import type { StyleProps } from "./style-props";

type Props<C extends ElementType> = Omit<
	ComponentProps<C>,
	"className" | "style"
> & {
	style?: StyleProps;
};

export function styled<C extends ElementType<{ className?: string }>>(
	Component: C,
	style: StyleProps,
) {
	const staticSheets = generateSheets(style);

	return ({ style, ...props }: Props<C>) => {
		const dynamicSheets = style ? generateSheets(style) : [];
		const sheets = [...staticSheets, ...dynamicSheets];
		const className = sheets.map((s) => s.className).join(" ");

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
