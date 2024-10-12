import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src", "!src/**/*.test.ts", "!src/__snapshots__/**/*"],
	format: ["cjs", "esm"],
	dts: true,
	clean: true,
});
