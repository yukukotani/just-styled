import type { FC, PropsWithChildren } from "react";
import React from "react";
import type { ConfigSchema } from "./config";
import { generateThemeSheets } from "./sheet";

export const ThemeProvider: FC<PropsWithChildren<{ config: ConfigSchema }>> = ({
  config,
  children,
}) => {
  const sheet = generateThemeSheets(config);

  return (
    <>
      <style precedence="theme" href="theme">
        {sheet}
      </style>
      {children}
    </>
  );
};
