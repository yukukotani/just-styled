import type * as CSS from "csstype";
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

/**
 * Define our `CSSProperties` type here because:
 * - React's `CSSProperties` type uses `string` but not `string & {}` so that it breaks literal auto-completion
 * - csstype's `CSS.Properties` type without type parameters doesn't receive number value
 */
type CSSProperties = CSS.Properties<(string & {}) | number>;

export type StyleProps =
	| {
			[K in keyof CSSProperties]: K extends ColorProps
				? TokensRef<"colors"> | CSSProperties[K]
				: K extends SpaceProps
					? TokensRef<"spaces"> | CSSProperties[K]
					: K extends SizeProps
						? TokensRef<"sizes"> | CSSProperties[K]
						: K extends FontSizeProps
							? TokensRef<"fontSizes"> | CSSProperties[K]
							: K extends RadiusProps
								? TokensRef<"radii"> | CSSProperties[K]
								: CSSProperties[K];
	  }
	| {
			[K in string]: (string & {}) | StyleProps;
	  };
