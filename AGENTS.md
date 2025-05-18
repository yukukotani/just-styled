# Contributor Guide

This repository contains **just-styled**, a small CSS-in-JS library for React 19 and a Next.js example.

## Directory Overview
- `src/` – Library implementation and tests.
- `example/` – Next.js sample application demonstrating usage.
- `dist/` – Build output (generated via `tsup`).
- `.github/workflows/` – CI definitions for lint, type check and test.

## Dev Environment Tips
- Use `pnpm` (`>=9.12.0` required) for all commands.
- Run `pnpm install` at the repo root to install dependencies. Run `pnpm install` inside `example/` if you want to try the demo locally.
- Format and lint with `pnpm run check:biome`; apply fixes using `pnpm run fix`.
- Type check with `pnpm run check:tsc` or `pnpm run check` to execute all check scripts.
- Build the library with `pnpm run build` to produce `dist/`.

## Testing Instructions
- CI plans live in `.github/workflows`.
- Execute tests via `pnpm test` or `pnpm run test:coverage`.
- To run a specific test, use `pnpm vitest run -t "<test name>"`.
- Fix any lint, type or test errors until the whole suite is green and add or update tests for your changes.

## Notes
- React 19's stylesheet support is required (see README for details).
- A TODO exists in `src/styled.tsx` to validate that the wrapped component has a `className` prop.
- The Next.js example in `example/` can be used to observe the library in action.

## PR instructions
Descriptions must be written in Japanese.
