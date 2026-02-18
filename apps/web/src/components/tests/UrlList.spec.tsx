import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import UrlList from "../UrlList";

describe("UrlList", () => {
  test("Should render correctly", () => {
    render(
      <UrlList
        items={[
          {
            id: "1",
            slug: "abc",
            destination: "https://example.com",
            createdAt: "2023-01-01T00:00:00Z",
            clickCount: 10,
          },
        ]}
        baseUrl="https://short.url"
      />,
    );
  });
});
