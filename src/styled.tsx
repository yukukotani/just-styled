import type { CSSProperties, ComponentProps, ElementType } from "react";
import React from "react";
import type { Tokens } from "./config";
import { generateSheets } from "./sheet";

type TokensRef<Kind extends string> = `$${Kind}.${Tokens<"colors">}`;

type Style =
	| CSSProperties
	| {
			color: TokensRef<"colors">;
	  };

type Props<C extends ElementType> = Omit<
	ComponentProps<C>,
	"className" | "style"
> & {
	style?: Style;
};

export function styled<C extends ElementType<{ className?: string }>>(
	Component: C,
	style: Style,
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
