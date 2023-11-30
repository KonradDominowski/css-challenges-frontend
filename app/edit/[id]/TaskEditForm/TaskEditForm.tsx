"use client";

import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import SidebarForm from "@/app/create/TaskForm/SidebarForm";
import ChallengeForm from "@/app/create/TaskForm/ChallengeForm";
import createTask from "@/app/edit/[id]/actions";
import { redirect } from "next/navigation";

interface Props {
  topics: Topic[];
  chapters: Chapter[];
  task: Task;
}

function getBody(html: string): string {
  let bodyStart: number = html.search("<body>") + 6;
  let bodyEnd: number = html.search("</body>");

  return html.slice(bodyStart, bodyEnd);
}

function getStyle(html: string): string {
  let styleStart: number = html.search("<style>") + 7;
  let styleEnd: number = html.search("</style>");

  return html.slice(styleStart, styleEnd);
}

export default function TaskEditForm({ topics, chapters, task }: Props) {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [starterSrcDoc, setStarterSrcDoc] = useState<string>("");
  const [topicID, setTopicID] = useState(0);
  const [chapterID, setChapterID] = useState(0);
  const [taskOrder, setTaskOrder] = useState(0);
  const [formIsFilled, setFormIsFilled] = useState(false);
  const [HTMLcode, setHTMLcode] = useState<string>("");
  const [CSScode, setCSScode] = useState<string>("");
  const [starterHTMLcode, setStarterHTMLcode] = useState<string>("");
  const [starterCSScode, setStarterCSScode] = useState<string>("");

  const chapter = chapters.find((chapter) => chapter.id == task.chapter);
  const topic = topics.find((topic) => topic.id == topicID);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setTopicID(chapter?.topic!);
    setChapterID(chapter?.id!);
    setTaskOrder(task.order);
    setHTMLcode(getBody(task.target));
    setCSScode(getStyle(task.target));
    setStarterHTMLcode(starterHTMLcode);
    setStarterCSScode(starterCSScode);
  }, []);

  const clearForm = () => {
    setChapterID(0);
    setTitle("");
    setDescription("");
    setHTMLcode("");
    setCSScode("");
    setStarterCSScode("");
    setStarterHTMLcode("");
  };

  async function onCreateTask(formData: FormData) {
    const res = await createTask(formData, task.id);

    if (res.status === "success") {
      toast({
        position: "top",
        title: "Success!",
        description: "Task saved successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      redirect(`/${topic?.slug}/challenge/${task.id}`);
    } else {
      toast({
        position: "top",
        title: "Oops!",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if ([title, description, srcDoc, topicID, chapterID, taskOrder].every((el) => Boolean(el) === true)) {
      setFormIsFilled(true);
    } else {
      setFormIsFilled(false);
    }
  }, [title, description, srcDoc, topicID, chapterID, taskOrder]);

  return (
    <form action={onCreateTask}>
      <SidebarForm
        formIsFilled={formIsFilled}
        topics={topics}
        chapters={chapters}
        topicID={topicID}
        setTopicID={setTopicID}
        chapterID={chapterID}
        setChapterID={setChapterID}
        taskOrder={taskOrder}
        setTaskOrder={setTaskOrder}
      />
      <ChallengeForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        srcDoc={srcDoc}
        setSrcDoc={setSrcDoc}
        HTMLcode={HTMLcode}
        setHTMLcode={setHTMLcode}
        CSScode={CSScode}
        setCSScode={setCSScode}
        starterCSScode={starterCSScode}
        setStarterCSScode={setStarterCSScode}
        starterHTMLcode={starterHTMLcode}
        setStarterHTMLcode={setStarterHTMLcode}
        starterSrcDoc={starterSrcDoc}
        setStarterSrcDoc={setStarterSrcDoc}
      />
    </form>
  );
}
