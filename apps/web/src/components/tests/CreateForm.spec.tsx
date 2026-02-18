import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import CreateForm from "../CreateForm";

describe("CreateForm", () => {
  test("Should render correctly", () => {
    render(<CreateForm onCreated={() => {}} />);
  });
});
