/// <reference types="react/canary" />

import type { ComponentProps, ElementType } from "react";
import React from "react";
import { generateSheets } from "./sheet";
import type { StyleProps } from "./style-props";

type Props<C extends ElementType> = Omit<ComponentProps<C>, "style"> & {
  style?: StyleProps;
};

// TODO: Should emit type error if C has no `className` props
export function styled<C extends ElementType>(Component: C, style: StyleProps) {
  const staticSheets = generateSheets(style);

  return (props: Props<C>) => {
    const dynamicSheets = props.style ? generateSheets(props.style) : [];
    const sheets = [...staticSheets, ...dynamicSheets];
    const sheetClassName = sheets.map((s) => s.className).join(" ");
    const className = props.className
      ? `${sheetClassName} ${props.className}`
      : sheetClassName;

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
