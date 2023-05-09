import AppLayout from "../layouts/AppLayout/AppLayout";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
jest.mock("next/router", () => require("next-router-mock"));

describe("AppLayout", () => {
  it("renders AppLayout component", () => {
    render(<AppLayout />);
    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
  });

  it("renders the title of the App", () => {
    render(<AppLayout />);
    expect(screen.getByText("Where in the world?")).toBeInTheDocument();
  });

  it("renders the dark mode button", () => {
    render(<AppLayout />);
    expect(screen.getByTestId("dark-mode-button")).toBeInTheDocument();
  });

  it("renders the dark mode button with the text 'Dark Mode'", () => {
    render(<AppLayout />);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });
});
