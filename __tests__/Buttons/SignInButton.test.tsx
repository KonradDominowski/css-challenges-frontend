import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession, signIn } from "next-auth/react";

import { SignInButton } from "@/app/components/Buttons";
import { mockSessionAuthorized } from "@/__test_mocks__/mocks";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSessionAuthorized, status: "authenticated" };
    }),
    signIn: jest.fn(),
  };
});

describe("when authenticated", () => {
  it("should render to the screen a dashboard link", () => {
    render(<SignInButton />);

    const signInButton = screen.getByTestId("dashboard-link");
    expect(signInButton).toBeInTheDocument();
  });

  it("should show user image", () => {
    render(<SignInButton />);
    const image = screen.getByRole("img", {
      name: /https:\/\/placehold\.co\/50x50\/jpg/i,
    });

    expect(image).toBeInTheDocument();
  });
});

describe("when unauthenticated", () => {
  it("should render to the screen", () => {
    useSession.mockImplementation(() => {
      return { data: null, status: "unauthenticated" };
    });

    render(<SignInButton />);

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    expect(signInButton).toBeInTheDocument();
  });

  it("should call SignIn function from NextAuth when clicked", async () => {
    useSession.mockImplementation(() => {
      return { data: null, status: "unauthenticated" };
    });

    render(<SignInButton />);

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });
    await userEvent.click(signInButton);

    expect(signIn.mock.calls.length).toBe(1);
  });
});

describe("when loading", () => {
  it("should render loading UI", () => {
    useSession.mockImplementation(() => {
      return { data: null, status: "loading" };
    });
    render(<SignInButton />);

    const spinner = screen.getByTestId("sign-in-button-spinner");

    expect(spinner).toBeInTheDocument();
  });
});
