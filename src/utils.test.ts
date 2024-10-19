import { describe, expect, test } from "vitest";
import { toKebabCase } from "./utils";

describe("toKebabCase", () => {
  test("keeps kebab-case value", () => {
    const kebab = toKebabCase("kebab-value");

    expect(kebab).toBe("kebab-value");
  });

  test("keeps lowercase value", () => {
    const kebab = toKebabCase("lowercase");

    expect(kebab).toBe("lowercase");
  });

  test("manipulates lowerCamelCase value", () => {
    const kebab = toKebabCase("lowerCamelCase");

    expect(kebab).toBe("lower-camel-case");
  });
});
