import { render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { styled } from "./styled";

describe("styled", async () => {
	test("renders style tag in head", async () => {
		const RedDiv = styled("div", {
			color: "red",
		});

		render(<RedDiv data-testid="red-div">RedDiv</RedDiv>);

		await waitFor(() => {
			const styleTag = Array.from(document.getElementsByTagName("style")).find(
				(e) => e.dataset.href != null,
			);
			expect(styleTag).toBeDefined();
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			expect(document.head).toContainElement(styleTag!);
			expect(styleTag).toHaveAttribute("data-precedence", "medium");
			expect(styleTag).not.toBeEmptyDOMElement();
		});
	});

	test("renders dynamic style", async () => {
		const RedDiv = styled("div", {
			color: "red",
		});

		render(
			<RedDiv data-testid="red-div" style={{ backgroundColor: "gray" }}>
				RedDiv
			</RedDiv>,
		);

		await waitFor(() => {
			const styleTags = Array.from(
				document.getElementsByTagName("style"),
			).filter((e) => e.dataset.href != null);
			expect(styleTags).toHaveLength(2);
			for (const styleTag of styleTags) {
				expect(document.head).toContainElement(styleTag);
				expect(styleTag).toHaveAttribute("data-precedence", "medium");
				expect(styleTag).not.toBeEmptyDOMElement();
			}
		});
	});
});
