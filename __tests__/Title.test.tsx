import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Title from "@/app/components/Title";

test("should have the title", () => {
  render(<Title />);

  const myElem = screen.getByText("practicing");

  expect(myElem).toBeInTheDocument();
});
