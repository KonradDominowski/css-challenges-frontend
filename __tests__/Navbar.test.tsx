import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NavBar from "@/app/components/NavBar";
import { mockSessionAuthorized } from "@/__test_mocks__/mocks";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSessionAuthorized, status: "authenticated" };
    }),
  };
});

it("should render navbar", () => {
  render(<NavBar />);

  const navbar = screen.getByRole("navigation");

  expect(navbar).toBeInTheDocument();
});
