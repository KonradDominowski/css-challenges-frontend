"use client";

import { Grid } from "@chakra-ui/react";
import Section from "./Section";
import { Session } from "next-auth";

interface Props {
  topics: Topic[];
  session: Session | null;
  tasksData: TaskData[] | undefined;
}

export default function Body({ topics, session, tasksData }: Props) {
  return (
    <>
      <Grid mx={"1rem"} templateColumns={"repeat(4, minmax(0, 1fr))"} gap={"1rem"}>
        {topics.map((topic) => (
          <Section
            topic={topic}
            userTasks={tasksData?.filter((task) => task.topic === topic.id)}
            session={session}
            key={topic.slug}
          />
        ))}
      </Grid>
    </>
  );
}
