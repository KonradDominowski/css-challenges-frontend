"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function Title() {
  return (
    <Box mt={"2rem"} textAlign={"center"}>
      <Heading as={"h1"} fontSize={"4.5rem"} lineHeight={"1"} fontWeight={400} letterSpacing={"-2px"}>
        Learn HTML and CSS <br></br>by <strong>practicing</strong>
      </Heading>
      <Text p={"5rem"}>
        Choose a topic you want to practice, or go ahead and do all challenges from start to finish
      </Text>
    </Box>
  );
}
