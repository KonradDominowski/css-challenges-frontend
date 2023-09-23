"use client";
import React, { useEffect, useState } from "react";

import { Session } from "next-auth";
import { Box, Flex, IconButton, VisuallyHiddenInput } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import CodeEditor from "@/app/components/Editors";
import TargetAndOutput from "@/app/components/TargetAndOutput";
import { SubmitButton } from "@/app/components/Buttons";

import styles from "./Challenge.module.scss";

interface Props {
  topic: Topic;
  taskData: TaskData | undefined;
  session: Session | null;
  params: {
    slug: string;
    id: string;
  };
}

export default function Challenge({ params, topic, taskData }: Props) {
  const [HTMLcode, setHTMLcode] = useState<string>(taskData?.html_code || "");
  const [CSScode, setCSScode] = useState<string>(taskData?.css_code || "");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [showDesc, setShowDesc] = useState(true);

  const task = topic.chapters!.flatMap((chapter) => chapter.tasks).find((task) => task.id === +params.id)!;

  function getNextTaskId(): string | undefined {
    const tasks = topic.chapters?.flatMap((chapter) => chapter.tasks)!;
    const currentIndex = tasks.indexOf(task);

    if (currentIndex + 1 === tasks?.length) {
      return undefined;
    }

    return tasks[currentIndex + 1].id.toString();
  }

  function getPreviousTaskId(): string | undefined {
    const tasks = topic.chapters?.flatMap((chapter) => chapter.tasks)!;
    const currentIndex = tasks.indexOf(task);

    if (currentIndex === 0) {
      return undefined;
    }

    return tasks[currentIndex - 1].id.toString();
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html lang="en">
        <body>${HTMLcode}</body>
        <style>
        body {
          background-color: white
        }
        ${CSScode}</style>
      </html>
    `);
    }, 50);

    return () => clearTimeout(timeout);
  }, [HTMLcode, CSScode]);

  return (
    <>
      <div className={styles.main} id="main">
        <Flex alignItems={"center"} justify={"space-between"}>
          <h1>{task!.title}</h1>
          <Flex>
            <IconButton
              as={"a"}
              href={getPreviousTaskId()}
              isDisabled={!getPreviousTaskId()}
              aria-label=""
              icon={<ArrowLeftIcon />}
            />
            <SubmitButton completed={taskData?.completed} />
            <IconButton
              as={"a"}
              href={getNextTaskId()}
              isDisabled={!getNextTaskId()}
              aria-label=""
              icon={<ArrowRightIcon />}
            />
          </Flex>
        </Flex>
        <p
          className={showDesc ? `${styles.description}` : `${styles.description} ${styles.hidden}`}
          onClick={() => setShowDesc((state) => !state)}
          id="description"
          dangerouslySetInnerHTML={{ __html: showDesc ? task!.description : task!.description.slice(0, 60) }}
        ></p>
        <div>
          <Box minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
            <TargetAndOutput target={task!.target} output={srcDoc} />
          </Box>
          <CodeEditor HTMLcode={HTMLcode} setHTMLcode={setHTMLcode} CSScode={CSScode} setCSScode={setCSScode} />
        </div>
      </div>
      <VisuallyHiddenInput type="number" name="id" readOnly value={taskData?.id} />
      <VisuallyHiddenInput type="number" name="task" readOnly value={params.id} />
      <VisuallyHiddenInput type="text" name="html_code" readOnly value={HTMLcode} />
      <VisuallyHiddenInput type="text" name="css_code" readOnly value={CSScode} />
    </>
  );
}
