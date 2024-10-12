import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		browser: {
			enabled: true,
			name: "chromium",
			provider: "playwright",
		},
	},
	// TODO: this is to make ecosystem work, remove when fixed
	server: {
		fs: {
			strict: false,
		},
	},
});
