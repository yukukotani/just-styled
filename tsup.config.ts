import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src", "!src/**/*.test.*", "!src/__snapshots__/**/*"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});
