import React from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { styled } from "./styled";

describe("styled", async () => {
	test("renders style tag in head", async () => {
		const RedDiv = styled("div", {
			color: "red",
		});

		const { getByTestId } = render(
			<RedDiv data-testid="red-div">RedDiv</RedDiv>,
		);

		const locator = getByTestId("red-div");
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

	test("renders dynamic style", async () => {
		const RedDiv = styled("div", {
			color: "red",
		});

		const { getByTestId } = render(
			<RedDiv data-testid="red-div" style={{ backgroundColor: "gray" }}>
				RedDiv
			</RedDiv>,
		);

		const locator = getByTestId("red-div");
		await expect.element(locator).toBeInTheDocument();

		const classNames = locator.element().className.split(" ");
		expect(classNames).toHaveLength(2);

		const styleTags = Array.from(document.getElementsByTagName("style")).filter(
			(e) => e.dataset.href && classNames.includes(e.dataset.href),
		);
		expect(styleTags).toHaveLength(2);
		for (const styleTag of styleTags) {
			expect(document.head).toContainElement(styleTag);
			expect(styleTag).toHaveAttribute("data-precedence", "medium");
			expect(styleTag).not.toBeEmptyDOMElement();
		}
	});
});
