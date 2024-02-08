import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { signOut } from "next-auth/react";

import { SignOutButton } from "@/app/components/Buttons";
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
    signOut: jest.fn(),
  };
});

// TODO - check if signOut function gets called
it("should render sign out button to the screen", () => {
  render(<SignOutButton />);

  const signOutButton = screen.getByRole("button", {
    name: /sign out/i,
  });

  expect(signOutButton).toBeInTheDocument();
});

it("should call SignOut function from NextAuth when clicked", async () => {
  render(<SignOutButton />);

  const signOutButton = screen.getByRole("button", {
    name: /sign out/i,
  });

  await userEvent.click(signOutButton);

  expect(signOut.mock.calls.length).toBe(1);
});
