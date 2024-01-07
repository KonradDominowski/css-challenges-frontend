"use client";

import { Grid } from "@chakra-ui/react";
import SectionSkeleton from "../Skeletons/SectionSkeleton";

// TODO - currently this loading screen is applied to all pages even in subroutes - need to fix that
export function LoadingMainPage() {
  return (
    <Grid templateColumns={"repeat(4, minmax(0, 1fr))"} gap={"1rem"}>
      {[1, 1, 1, 1].map((_, i) => (
        <SectionSkeleton key={i} />
      ))}
    </Grid>
  );
}
