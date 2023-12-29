"use client";
import React, { useEffect, useState } from "react";

import { Session } from "next-auth";
import { Box, Flex, IconButton, VisuallyHiddenInput, Text, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import CodeEditor from "@/app/components/Editors";
import TargetAndOutput from "@/app/components/TargetAndOutput";
import { SubmitButton } from "@/app/components/Buttons";

import styles from "./Challenge.module.scss";
import { useSession } from "next-auth/react";

interface Props {
  topic: Topic;
  userTaskData: TaskData | undefined;
  session: Session | null;
  params: {
    slug: string;
    id: string;
  };
}

export default function Challenge({ params, topic, userTaskData }: Props) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email == "konrad.dominowski@gmail.com";

  const task = topic.chapters!.flatMap((chapter) => chapter.tasks).find((task) => task.id === +params.id)!;

  const [HTMLcode, setHTMLcode] = useState<string>(userTaskData?.html_code || task.starter_html_code || "");
  const [CSScode, setCSScode] = useState<string>(userTaskData?.css_code || task.starter_css_code || "");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [hideDesc, setHideDesc] = useState(false);
  const [showOutline, setShowOutline] = useState(false);

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

  let classes = styles.description;
  if (hideDesc) classes += ` ${styles.hidden}`;
  if (showOutline) classes += ` ${styles.outline}`;

  return (
    <>
      <div className={styles.main} id="main">
        <Flex alignItems={"center"} justify={"space-between"}>
          <h1>{task!.title}</h1>
          <Flex>
            {isAdmin && (
              <Button as={"a"} href={`/edit/${params.id}`}>
                Edit
              </Button>
            )}

            <IconButton
              as={"a"}
              href={getPreviousTaskId()}
              isDisabled={!getPreviousTaskId()}
              aria-label=""
              icon={<ArrowLeftIcon />}
            />
            <SubmitButton completed={userTaskData?.completed} />
            <IconButton
              as={"a"}
              href={getNextTaskId()}
              isDisabled={!getNextTaskId()}
              aria-label=""
              icon={<ArrowRightIcon />}
            />
          </Flex>
        </Flex>
        <Text
          className={classes}
          py={3}
          borderRadius={5}
          onClick={() => setHideDesc((state) => !state)}
          onMouseEnter={() => setShowOutline(true)}
          onMouseLeave={() => setShowOutline(false)}
          id="description"
          dangerouslySetInnerHTML={{ __html: !hideDesc ? task!.description : task!.description.slice(0, 60) }}
        ></Text>
        <div>
          <Box mb={4} minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
            <TargetAndOutput target={task!.target} output={srcDoc} />
          </Box>
          <CodeEditor HTMLcode={HTMLcode} setHTMLcode={setHTMLcode} CSScode={CSScode} setCSScode={setCSScode} />
        </div>
      </div>
      <VisuallyHiddenInput type="number" name="id" readOnly value={userTaskData?.id} />
      <VisuallyHiddenInput type="number" name="task" readOnly value={params.id} />
      <VisuallyHiddenInput type="text" name="html_code" readOnly value={HTMLcode} />
      <VisuallyHiddenInput type="text" name="css_code" readOnly value={CSScode} />
    </>
  );
}
