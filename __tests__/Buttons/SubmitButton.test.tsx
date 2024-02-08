import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { experimental_useFormStatus } from "react-dom";

import { SubmitButton } from "@/app/components/Buttons";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    experimental_useFormStatus: jest.fn(),
  };
});

describe("Submit button when not loading", () => {
  it("should render to the screen", () => {
    experimental_useFormStatus.mockImplementation(() => {
      return {
        pending: false,
        data: null,
        method: null,
        action: null,
      };
    });

    render(<SubmitButton completed={false} />);

    const button = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should render checkmark and exact text when completed", () => {
    experimental_useFormStatus.mockImplementation(() => {
      return {
        pending: false,
        data: null,
        method: null,
        action: null,
      };
    });

    render(<SubmitButton completed={true} />);

    const button = screen.getByRole("button", {
      name: /done/i,
    });
    const checkmark = screen.getByTestId("checkmark");

    expect(button).toBeInTheDocument();
    expect(checkmark).toBeInTheDocument();
  });
});

describe("Submit button when loading", () => {
  it("should be disabled", () => {
    experimental_useFormStatus.mockImplementation(() => {
      return {
        pending: true,
        data: null,
        method: null,
        action: null,
      };
    });

    render(<SubmitButton completed={false} />);

    const button = screen.getByTestId("submit-button");

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  //   TODO - how to check if it is loading
  it("should show loading indicator", () => {});
});
