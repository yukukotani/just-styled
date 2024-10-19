import { render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { Box } from "./Box";

describe("Box component", async () => {
  test("renders style tag in head", async () => {
    render(<Box style={{ color: "red" }}>RedDiv</Box>);

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
});
