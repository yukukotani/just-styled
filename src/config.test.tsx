import { describe, expect, expectTypeOf, test } from "vitest";
import { defineConfig } from "./config";

describe("defineConfig", () => {
	test("returns the same object to given one", () => {
		const config = defineConfig({
			tokens: {
				colors: {
					"gray.300": "#222222",
					"gray.500": "#666666",
				},
			},
		});

		expect(config).toEqual({
			tokens: {
				colors: {
					"gray.300": "#222222",
					"gray.500": "#666666",
				},
			},
		});
		expectTypeOf(config).toMatchTypeOf<{
			tokens: {
				colors: {
					"gray.300": "#222222";
					"gray.500": "#666666";
				};
			};
		}>();
	});
});
