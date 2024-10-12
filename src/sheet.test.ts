import { describe, expect, test } from "vitest";
import { generateSheets } from "./sheet";

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
});
