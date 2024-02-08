import { Session } from "next-auth";

export const mockSessionAuthorized: Session = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "admin", email: "admin@admin.admin", image: "https://placehold.co/50x50/jpg" },
};

export const mockTask1: Task = {
  id: 1,
  title: "Title of test task 1",
  description: "Description of test task 1",
  target: "HTML test target",
  starter_html_code: null,
  starter_css_code: null,
  order: 1,
  chapter: 1,
  topic: 1,
};

export const mockTask2: Task = {
  id: 2,
  title: "Title of test task 2",
  description: "Description of test task 2",
  target: "HTML test target",
  starter_html_code: null,
  starter_css_code: null,
  order: 2,
  chapter: 1,
  topic: 1,
};

export const mockUserTask1: TaskData = {
  id: 1,
  user: 1,
  topic: 1,
  task: 1,
  html_code: "",
  css_code: "",
  completed: true,
};

export const mockUserTask2: TaskData = {
  id: 2,
  user: 1,
  topic: 1,
  task: 2,
  html_code: "",
  css_code: "",
  completed: true,
};

export const mockChapter: Chapter = {
  id: 1,
  title: "Test chapter 1",
  tasks: [mockTask1, mockTask2],
  order: 1,
  topic: 1,
};

export const mockDescription: Description = {
  challenges: "",
  finishing_statement: "Test finishing statement",
  subtitle: "Test subtitle",
  body: {
    paragraphs: [{ text: "Paragraph 1" }, { text: "Paragraph 2" }, { text: "Paragraph 3" }],
  },
  to_learn: {
    items: [
      { main: "Test main 1", sub: "Test sub 1" },
      { main: "Test main 2", sub: "Test sub 2" },
      { main: "Test main 3", sub: "Test sub 3" },
    ],
  },
};

export const mockTopic: Topic = {
  id: 1,
  title: "Test topic",
  slug: "test-topic",
  logo_url: "test_url",
  short_description: "This is a test short description",
  description: mockDescription,
  chapters: [mockChapter],
  long_description:
    "Test long description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur atque quasi nostrum nam, error, modi quibusdam, sed nobis distinctio quas ullam iusto dolorum quos vero quia? Repellendus totam sequi voluptas! Magnam dignissimos sit animi, ipsa accusantium voluptatum optio repellendus nihil, eum quo, mollitia deleniti vitae sint pariatur sapiente amet in.",
  order: 1,
  is_ready: true,
};

export const mockTopic2: Topic = {
  id: 1,
  title: "Test topic",
  slug: "test-topic",
  logo_url: "test_url",
  short_description: "This is a test short description",
  description: mockDescription,
  chapters: [mockChapter],
  long_description:
    "Test long description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur atque quasi nostrum nam, error, modi quibusdam, sed nobis distinctio quas ullam iusto dolorum quos vero quia? Repellendus totam sequi voluptas! Magnam dignissimos sit animi, ipsa accusantium voluptatum optio repellendus nihil, eum quo, mollitia deleniti vitae sint pariatur sapiente amet in.",
  order: 1,
  is_ready: false,
};
