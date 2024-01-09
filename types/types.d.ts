interface Task {
  id: number;
  title: string;
  description: string;
  target: string;
  starter_html_code: string | null;
  starter_css_code: string | null;
  updated?: string;
  order: number;
  chapter: number;
  topic: number;
}

interface TaskData {
  id?: number;
  user?: number;
  topic: number;
  task: number;
  html_code: string;
  css_code: string;
  completed: boolean;
}

interface Chapter {
  id: number;
  title: string;
  tasks: Task[];
  order: number;
  topic: number;
}

interface Topic {
  id: number;
  title: string;
  slug: string;
  logo_url: string;
  short_description: string;
  description?: Description;
  chapters?: Chapter[];
  long_description?: string;
  order?: number;
  is_ready?: boolean;
}

interface Description {
  challenges: string;
  finishing_statement: string;
  subtitle: string;
  body: { paragraphs: { text: string }[] };
  to_learn: {
    items: {
      main: string;
      sub: string;
    }[];
  };
}

interface Providers {
  github: string;
  google: string;
}

interface Link {
  name: string;
  href: string;
}

type closingBrackets = "}}" | "]]" | "\\\\";
