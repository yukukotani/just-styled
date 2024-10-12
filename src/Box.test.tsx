import React from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Box } from "./Box";

describe("Box component", async () => {
	test("renders style tag in head", async () => {
		const { getByText } = render(<Box color="red">RedDiv</Box>);

		const locator = getByText("RedDiv");
		await expect.element(locator).toBeInTheDocument();

		const classNames = locator.element().className.split(" ");
		expect(classNames).toHaveLength(1);

		const styleTag = Array.from(document.getElementsByTagName("style")).find(
			(e) => e.dataset.href === classNames[0],
		);
		expect(styleTag).toBeDefined();
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		expect(document.head).toContainElement(styleTag!);
		expect(styleTag).toHaveAttribute("data-precedence", "medium");
		expect(styleTag).not.toBeEmptyDOMElement();
	});
});
