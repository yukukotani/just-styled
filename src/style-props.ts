import type { CSSProperties } from "react";
import type { Tokens } from "./config";

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

export type StyleProps =
	| CSSProperties
	| {
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
	  }
	| {
			[K in string]: string | StyleProps;
	  };
