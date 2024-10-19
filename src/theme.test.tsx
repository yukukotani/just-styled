import { cleanup, render, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, test } from "vitest";
import { ThemeProvider } from "./theme";

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
