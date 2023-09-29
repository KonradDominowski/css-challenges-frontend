"use client";

import { Grid } from "@chakra-ui/react";
import SectionSkeleton from "./components/Skeletons/SectionSkeleton";
import Title from "./components/Title";

// TODO - currently this loading screen is applied to all pages even in subroutes - need to fix that
export default function loading() {
  return (
    <>
      <Title />

      <Grid templateColumns={"repeat(4, minmax(0, 1fr))"} gap={"1rem"}>
        {[1, 1, 1, 1].map((_, i) => (
          <SectionSkeleton key={i} />
        ))}
      </Grid>
    </>
  );
}
