import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Section from "@/app/components/Section";
import { mockSession, mockTopic, mockTopic2, mockUserTask1, mockUserTask2 } from "@/__test_mocks__/mocks";

it("should render to the screen", () => {
  render(<Section session={null} topic={mockTopic} userTasks={undefined} />);

  const section = screen.getByRole("link");
  expect(section).toBeInTheDocument();
});

it("should have correct href attribute", () => {
  render(<Section session={null} topic={mockTopic} userTasks={undefined} />);

  const section = screen.getByRole("link");

  expect(section.getAttribute("href")).toEqual(mockTopic.slug);
});

it("should display correct info", () => {
  render(<Section session={null} topic={mockTopic} userTasks={undefined} />);

  const title = screen.getByRole("heading", { name: /test topic/i });
  const description = screen.getByText(/this is a test short description/i);
  const image = screen.getByRole("img", { name: /logo/i });

  expect(title.innerHTML).toEqual(mockTopic.title);
  expect(description.innerHTML).toEqual(mockTopic.short_description);
  expect(image.getAttribute("src")).toEqual(mockTopic.logo_url);
});

it("should be styled if all exercises are completed by user", () => {
  render(<Section session={mockSession} topic={mockTopic} userTasks={[mockUserTask1, mockUserTask2]} />);

  const checkmark = screen.getByTestId("completed");
  expect(checkmark).toBeInTheDocument();
});

it("should be styled if not ready", () => {
  render(<Section session={null} topic={mockTopic2} userTasks={undefined} />);

  const section = screen.getByRole("link");
  expect(section.classList.contains("disabled")).toBeTruthy();
});
