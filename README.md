# just-styled

A dead simple CSS-in-JS library for React 19 or higher.

## Features

- **Familiar API**: Both styled-components-like Styled Function and Style Prop are supported
- **Typed Theme**: Auto-completes your design token
- **RSC Support**: It just works. Nothing bothers you
- **No Build Step**: No need to set up build configuration
- **Small Runtime:** It's 1.7 kb minified & gzipped
- **Atomic CSS**: Generates optimized stylesheet to keep your distribution small

## Installation

> [!IMPORTANT]
> just-styled requires React 19 since it's based on [React 19's stylesheet support](https://react.dev/blog/2024/04/25/react-19#support-for-stylesheets). You can try it on [Next.js 15 RC](https://nextjs.org/blog/next-15-rc) for now.

```bash
npm install just-styled
```

## Usage

### Styled Function

Creates your component with `styled` function.

```tsx
import { styled } from "just-styled";

const StyledBox = styled("div", {
  fontSize: "20px",
  backgroundColor: "gray",
});

<StyledBox>The background is gray</StyledBox>;
```

### Style Prop

Declares inline style with `style` prop.

```tsx
<StyledBox style={{ color: "green" }}>The text color is green</StyledBox>
```

### Box Component

We also have the built-in Box component as an equivalent of div.

```tsx
import { Box } from "just-styled";

<Box style={{ fontSize = "100px" }}>Big text</Box>;
```

This is just a syntax sugar for the code below.

```tsx
const Box = styled("div", {});
```

### Theme

Create a config file anywhere you want.

```tsx
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

// This is required for auto-completion
type UserConfig = typeof config;
declare module "just-styled" {
  export interface JustStyledConfig extends UserConfig {}
}
```

Then, put ThemeProvider at the top of your component tree (e.g., `layout.tsx` on Next.js).

```tsx
// import the config you defined
import { config } from "./theme-config.ts";
import { ThemeProvider } from "just-styled";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ThemeProvider config={config}>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
```

Now, you can use your tokens with auto-completion.

```tsx
const StyledBox = styled("div", {
  backgroundColor: "$colors.bg",
  padding: "$spaces.md",
});

<StyledBox style={{ color: "$colors.red.600" }}>Styled!</StyledBox>;
```
