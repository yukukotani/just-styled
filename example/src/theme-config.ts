import { defineConfig } from "just-styled";

export const config = defineConfig({
  tokens: {
    colors: {
      "gray.200": "#eeeeee",
      "gray.600": "#555555",
      "red.200": "#EB7076",
      "red.600": "#E02932",
      primary: "$colors.red.600",
      bg: "$colors.gray.200",
    },
    spaces: {
      sm: "8px",
      md: "16px",
    },
  },
});

type UserConfig = typeof config;
declare module "just-styled" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface JustStyledConfig extends UserConfig {}
}
