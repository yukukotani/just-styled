import { render, waitFor } from "@testing-library/react";
import React, { type ComponentProps } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { generateSheets } from "./sheet";
import { styled } from "./styled";

describe("styled", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock("./sheet", { spy: true });
  });

  test("renders style tag in head", async () => {
    const RedDiv = styled("div", {
      color: "red",
      gap: "$spaces.md",
    });

    render(<RedDiv>RedDiv</RedDiv>);

    await waitFor(() => {
      expect(generateSheets).toHaveBeenCalledTimes(1);
      expect(generateSheets).toHaveBeenCalledWith({
        color: "red",
        gap: "$spaces.md",
      });

      const styleTags = Array.from(
        document.getElementsByTagName("style"),
      ).filter((e) => e.dataset.href != null);
      expect(styleTags).toHaveLength(2);
      for (const styleTag of styleTags) {
        expect(document.head).toContainElement(styleTag);
        expect(styleTag).toHaveAttribute("data-precedence", "medium");
        expect(styleTag.textContent).toMatchSnapshot();
      }
    });
  });

  test("renders dynamic style", async () => {
    const YellowDiv = styled("div", {
      color: "yellow",
    });

    render(
      <YellowDiv style={{ backgroundColor: "gray", padding: "$spaces.md" }}>
        RedDiv
      </YellowDiv>,
    );

    await waitFor(() => {
      expect(generateSheets).toHaveBeenCalledTimes(2);
      expect(generateSheets).toHaveBeenCalledWith({ color: "yellow" });
      expect(generateSheets).toHaveBeenCalledWith({
        backgroundColor: "gray",
        padding: "$spaces.md",
      });
    });
  });

  test("renders styled custom component", async () => {
    const BlueComp = styled(Comp, {
      color: "blue",
    });

    const res = render(
      <BlueComp data-testid="blue-comp" title="Blue">
        BlueComp
      </BlueComp>,
    );
    const el = await res.findByTestId("blue-comp");

    await waitFor(() => {
      expect(generateSheets).toHaveBeenCalledTimes(1);
      expect(generateSheets).toHaveBeenCalledWith({ color: "blue" });

      expect(el.className).not.toBe("");
      expect(el).toHaveAttribute("data-title", "Blue");
    });
  });
});

function Comp({
  children,
  title,
  ...props
}: ComponentProps<"div"> & { title: string }) {
  return (
    <div {...props} data-title={title}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  );
}
