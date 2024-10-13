import type { CSSProperties, ComponentProps, ElementType } from "react";
import React from "react";
import type { Tokens } from "./config";
import { generateSheets } from "./sheet";

type ColorProps =
	| "color"
	| "backgroundColor"
	| "borderColor"
	| "outlineColor"
	| "accentColor"
	| "caretColor";
type SpaceProps =
	| "margin"
	| "marginTop"
	| "marginRight"
	| "marginBottom"
	| "marginLeft"
	| "padding"
	| "paddingTop"
	| "paddingRight"
	| "paddingBotom"
	| "paddingLeft"
	| "gap";
type SizeProps =
	| "width"
	| "maxWidth"
	| "minWidth"
	| "height"
	| "maxHeight"
	| "minHeight";
type FontSizeProps = "fontSize";
type RadiusProps = "borderRadius";

type TokensRef<Kind extends string> =
	`$${Kind}.${Tokens<Kind> extends string ? Tokens<Kind> : never}`;

export type StyleObject = {
	[K in keyof CSSProperties]: K extends ColorProps
		? TokensRef<"colors">
		: K extends SpaceProps
			? TokensRef<"spaces">
			: K extends SizeProps
				? TokensRef<"sizes">
				: K extends FontSizeProps
					? TokensRef<"fontSizes">
					: K extends RadiusProps
						? TokensRef<"radii">
						: CSSProperties[K];
};

type Props<C extends ElementType> = Omit<
	ComponentProps<C>,
	"className" | "style"
> & {
	style?: StyleObject;
};

export function styled<C extends ElementType<{ className?: string }>>(
	Component: C,
	style: StyleObject,
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
