import { cleanup, render, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, test } from "vitest";
import { ThemeProvider, transformTokenToCssVariable } from "./theme";

describe("ThemeProvider", () => {
	afterEach(() => {
		cleanup();
		jsdom.reconfigure({});
	});

	test("renders style tag in head", async () => {
		render(
			<ThemeProvider config={{ tokens: { colors: { lightGray: "#666666" } } }}>
				<div>Themed1</div>
			</ThemeProvider>,
		);

		await waitFor(() => {
			const styleTag = Array.from(document.getElementsByTagName("style")).find(
				(e) => e.dataset.href === "theme",
			);
			expect(styleTag).toBeDefined();
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			expect(document.head).toContainElement(styleTag!);
			expect(styleTag).toHaveAttribute("data-precedence", "theme");
			expect(styleTag?.textContent).toBe(
				":root { --j-colors-light-gray: #666666; }",
			);
		});
	});
});

describe("transformTokenToCssVariable", () => {
	test("keeps lowercase value", () => {
		const res = transformTokenToCssVariable("colors.myred");
		expect(res).toBe("--j-colors-myred");
	});

	test("keeps kebab-case value", () => {
		const res = transformTokenToCssVariable("colors.my-red");
		expect(res).toBe("--j-colors-my-red");
	});

	test("transforms dot-separated value", () => {
		const res = transformTokenToCssVariable("colors.red.500");
		expect(res).toBe("--j-colors-red-500");
	});

	test("transforms lowerCamelCase value", () => {
		const res = transformTokenToCssVariable("colors.lightGray");
		expect(res).toBe("--j-colors-light-gray");
	});

	test("transforms value with category parameter", () => {
		const res = transformTokenToCssVariable("red.500", "colors");
		expect(res).toBe("--j-colors-red-500");
	});

	test("transforms complex value", () => {
		const res = transformTokenToCssVariable("colors.lightGray.500");
		expect(res).toBe("--j-colors-light-gray-500");
	});
});
