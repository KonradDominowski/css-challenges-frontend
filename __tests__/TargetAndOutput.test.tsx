import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import TargetAndOutput from "@/app/components/TargetAndOutput";

it("should render to the screen", () => {
  render(<TargetAndOutput target="" output="" />);

  const targetAndOutput = screen.getByTestId("target-and-output");
  expect(targetAndOutput).toBeInTheDocument();
});

it("should display output tab as default", () => {
  render(<TargetAndOutput target="" output="" />);

  const output = screen.getByTestId("tab-output");
  const target = screen.getByTestId("tab-target");

  expect(output).toBeVisible();
  expect(target).not.toBeVisible();
});

it("should be able to switch tabs between target and output", async () => {
  render(<TargetAndOutput target="" output="" />);

  const output = screen.getByTestId("tab-output");
  const target = screen.getByTestId("tab-target");
  const outputTabButton = screen.getByRole("tab", { name: /output/i });
  const targetTabButton = screen.getByRole("tab", { name: /target/i });

  expect(output).toBeVisible();
  expect(target).not.toBeVisible();

  await userEvent.click(targetTabButton);

  expect(output).not.toBeVisible();
  expect(target).toBeVisible();

  await userEvent.click(outputTabButton);

  expect(output).toBeVisible();
  expect(target).not.toBeVisible();
});

it("should compare output to target when show diff checkbox is checked", async () => {
  render(<TargetAndOutput target="" output="" />);

  const output = screen.getByTestId("tab-output");
  const compare = screen.getByTestId("tab-compare");
  const showDiffCheckbox = screen.getByText(/show diff/i);

  expect(compare).not.toBeVisible();

  await userEvent.click(showDiffCheckbox);

  expect(compare).toBeVisible();

  await userEvent.click(showDiffCheckbox);

  expect(compare).not.toBeVisible();
});
