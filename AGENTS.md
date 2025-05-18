# Repository Guidelines

This repository contains the source code for **just-styled**, a small CSS-in-JS library targeting React 19. Below are the main points contributors should know.

## Directory Overview
- `src/` – Library implementation and tests.
- `example/` – Next.js sample application demonstrating usage.
- `dist/` – Build output (generated via `tsup`).
- `.github/workflows/` – CI definitions for lint, type check and test.

## Development
- **Package Manager**: `pnpm` (`>=9.12.0` required).
- **Formatting & Lint**: Uses [Biome](https://biomejs.dev/). Run `pnpm run check:biome` to verify. Use `pnpm run fix` to apply fixes.
- **Type Checking**: Run `pnpm run check:tsc` (or `pnpm run check` to run all `check:*` scripts).
- **Testing**: Vitest is configured. Execute `pnpm test` or `pnpm run test:coverage`.
- **Build**: `pnpm run build` generates files in `dist/`.

## Notes
- React 19's stylesheet support is required (see README for details).
- A TODO exists in `src/styled.tsx` to validate that the wrapped component has a `className` prop.
- The Next.js example in `example/` can be used to observe the library in action.

Contributors should ensure formatting, type checking and tests pass before committing.
