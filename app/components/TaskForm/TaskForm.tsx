"use client";

import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import SidebarForm from "@/app/components/TaskForm/SidebarForm";
import createTask from "@/app/create/actions";
import { redirect } from "next/navigation";
import { decodeCodeBlocks, encodeWithCodeblocks, getBodyFromHTML, getStyleFromHTML } from "@/functions/editingCode";
import ChallengeForm from "./ChallengeForm";
import ChallengePreview from "./ChallengePreview";

interface Props {
  topics: Topic[];
  chapters: Chapter[];
  task?: Task;
}

// TODO - prevent route change so data is not lost
export default function TaskForm({ topics, chapters, task }: Props) {
  const toast = useToast();
  const [preview, setPreview] = useState(false);
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

  useEffect(() => {
    if (task) {
      const chapter = chapters.find((chapter) => chapter.id == task.chapter);
      const topic = topics.find((topic) => topic.id == chapter?.topic);

      setTitle(task.title);
      setDescription(decodeCodeBlocks(task.description));
      setTopicID(topic?.id!);
      setChapterID(chapter?.id!);
      setTaskOrder(task.order);
      setHTMLcode(getBodyFromHTML(task.target));
      setCSScode(getStyleFromHTML(task.target));
      setStarterHTMLcode(task.starter_html_code || "");
      setStarterCSScode(task.starter_css_code || "");
    }
  }, [chapters, task, topics]);

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
    const res = await createTask(formData, { taskID: task?.id });

    if (res.status === "success") {
      toast({
        position: "top",
        title: "Success!",
        description: "Task saved successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      if (task) {
        const chapter = chapters.find((chapter) => chapter.id == task.chapter);
        const topic = topics.find((topic) => topic.id == chapter?.topic);
        redirect(`/${topic?.slug}/challenge/${task.id}`);
      }

      clearForm();
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

  function togglePreview(): undefined {
    if (!preview) {
      setDescription((state) => encodeWithCodeblocks(state));
    } else {
      setDescription((state) => decodeCodeBlocks(state));
    }

    setPreview((state) => !state);
  }

  function togglePreviewKeyboardShortcut(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.ctrlKey && e.shiftKey && e.key === "P") {
      e.preventDefault();
      togglePreview();
    }
  }

  return (
    <form action={onCreateTask} onKeyDown={togglePreviewKeyboardShortcut}>
      <SidebarForm
        preview={preview}
        togglePreview={togglePreview}
        setPreview={setPreview}
        formIsFilled={formIsFilled}
        task={task}
        topics={topics}
        chapters={chapters}
        topicID={topicID}
        setTopicID={setTopicID}
        chapterID={chapterID}
        setChapterID={setChapterID}
        taskOrder={taskOrder}
        setTaskOrder={setTaskOrder}
      />
      {preview ? (
        <ChallengePreview
          title={title}
          description={description}
          target={srcDoc}
          starter_html_code={starterHTMLcode}
          starter_css_code={starterCSScode}
        />
      ) : (
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
      )}
    </form>
  );
}
