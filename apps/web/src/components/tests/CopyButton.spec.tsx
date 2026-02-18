import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CopyButton from "../CopyButton";
import "@testing-library/jest-dom/vitest";

describe("CopyButton", () => {
  test("Should render correctly", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
    render(<CopyButton text="https://example.com" />);

    const copyButton = screen.getByRole("button");

    expect(copyButton).toHaveTextContent("Copy");
  });
});
