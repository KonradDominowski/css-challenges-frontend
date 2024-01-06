"use client";

import { Grid } from "@chakra-ui/react";
import Section from "./Section";

export default function Body({ topics }: { topics: Topic[] }) {
  return (
    <>
      <Grid mx={"1rem"} templateColumns={"repeat(4, minmax(0, 1fr))"} gap={"1rem"}>
        {topics.map((topic) => (
          <Section key={topic.slug} {...topic} />
        ))}
      </Grid>
    </>
  );
}
