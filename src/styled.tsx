import { ComponentProps, CSSProperties, ElementType } from "react";
import fnv1a from "@sindresorhus/fnv1a";

export function styled<C extends ElementType<{ className?: string }>>(
  Component: C,
  props: CSSProperties
) {
  const sheets = generateSheets(props);

  return (props: ComponentProps<C>) => {
    return (
      <>
        {sheets.map((s) => (
          <style key={s.className} href={s.className} precedence="medium">
            {s.sheet}
          </style>
        ))}
        {/* @ts-expect-error */}
        <Component
          {...props}
          className={sheets.map((s) => s.className).join(" ")}
        />
      </>
    );
  };
}

function generateSheets(props: CSSProperties) {
  const sheets: { className: string; sheet: string }[] = [];

  for (const [key, value] of Object.entries(props)) {
    if (value) {
      const kebab = toKebabCase(key);
      const hash = fnv1a(`${key}${value}`, { size: 32 })
        .toString(36)
        .slice(0, 4);
      const className = `x${hash}`;
      sheets.push({
        className: className,
        sheet: `.${className} { ${kebab}: ${value}; }`,
      });
    }
  }

  return sheets;
}
function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
