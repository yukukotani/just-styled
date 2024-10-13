import { describe, expect, test } from "vitest";
import {
	generateSheets,
	generateThemeSheets,
	resolvePropertyValue,
	transformTokenToCssVariable,
} from "./sheet";

describe("generateSheets", () => {
	test("generates simple single property", () => {
		const sheets = generateSheets({
			color: "red",
		});

		expect(sheets).toHaveLength(1);
		expect(sheets).toMatchSnapshot();
	});

	test("generates camelCase property as kebab-case key", () => {
		const sheets = generateSheets({
			backgroundColor: "black",
		});

		expect(sheets).toHaveLength(1);
		expect(sheets).toMatchSnapshot();
	});

	test("generates multiple properties", () => {
		const sheets = generateSheets({
			border: "1px solid red",
			borderRadius: "4px",
		});

		expect(sheets).toHaveLength(2);
		expect(sheets).toMatchSnapshot();
	});

	test("generates the same class for the same style", () => {
		const sheets1 = generateSheets({
			color: "red",
		});
		const sheets2 = generateSheets({
			color: "red",
		});

		expect(sheets1).toHaveLength(1);
		expect(sheets2).toHaveLength(1);
		expect(sheets1[0].className === sheets2[0].className).toBe(true);
	});

	test("generates different classes for different values", () => {
		const sheets1 = generateSheets({
			color: "red",
		});
		const sheets2 = generateSheets({
			color: "white",
		});

		expect(sheets1).toHaveLength(1);
		expect(sheets2).toHaveLength(1);
		expect(sheets1[0].className === sheets2[0].className).toBe(false);
	});

	test("generates different classes for different properties", () => {
		const sheets1 = generateSheets({
			color: "red",
		});
		const sheets2 = generateSheets({
			backgroundColor: "red",
		});

		expect(sheets1).toHaveLength(1);
		expect(sheets2).toHaveLength(1);
		expect(sheets1[0].className === sheets2[0].className).toBe(false);
	});

	test("generates custom property reference", () => {
		const sheets = generateSheets({
			color: "$colors.red",
		});

		expect(sheets).toHaveLength(1);
		expect(sheets).toMatchSnapshot();
	});

	test("generates custom property reference with kebab-case transformation", () => {
		const sheets = generateSheets({
			color: "$colors.lightGray",
		});

		expect(sheets).toHaveLength(1);
		expect(sheets).toMatchSnapshot();
	});
});

describe("generateThemeSheets", () => {
	test("generates single token", () => {
		const sheet = generateThemeSheets({
			tokens: {
				colors: {
					lightGray: "#666666",
				},
			},
		});

		expect(sheet).toMatchSnapshot();
	});

	test("generates multiple tokens", () => {
		const sheet = generateThemeSheets({
			tokens: {
				colors: {
					"gray.200": "#eeeeee",
					"gray.600": "#666666",
				},
				spaces: {
					sm: "4px",
				},
				sizes: {
					lg: "120px",
				},
				fontSizes: {
					md: "16px",
				},
				radii: {
					xs: "2px",
				},
			},
		});

		expect(sheet).toMatchSnapshot();
	});

	test("generates a token which refer the other token", () => {
		const sheet = generateThemeSheets({
			tokens: {
				colors: {
					gray: "#666666",
					primary: "$colors.gray",
				},
			},
		});

		expect(sheet).toMatchSnapshot();
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

describe("resolvePropertyValue", () => {
	test("keeps string value", () => {
		const res = resolvePropertyValue("red");
		expect(res).toBe("red");
	});

	test("resolves token", () => {
		const res = resolvePropertyValue("$colors.red.500");
		expect(res).toBe("var(--j-colors-red-500)");
	});
});
