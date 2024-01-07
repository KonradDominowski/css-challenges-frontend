"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, Button, IconButton, Skeleton, SkeletonText, Box, Text } from "@chakra-ui/react";

export default function LoadingChallenge() {
  return (
    <Box ml={"12rem"} mr={"1rem"} pl={"2rem"}>
      <Flex justify={"space-between"} align={"center"}>
        <Skeleton borderRadius={5}>
          <Text as={"h1"} pt={"1rem"} fontSize={"3rem"}>
            Title Title Title
          </Text>
        </Skeleton>
        <Flex>
          <IconButton isDisabled aria-label="" icon={<ArrowLeftIcon />} />
          <Button isLoading colorScheme="green" type="submit">
            Submit
          </Button>
          <IconButton isDisabled aria-label="" icon={<ArrowRightIcon />} />
        </Flex>
      </Flex>
      <Box w={"60%"}>
        <SkeletonText py={5} w={"80%"} noOfLines={10} spacing={3.5} borderRadius={10} />
      </Box>
      <Flex gap={4} my={3}>
        <Skeleton px={5} flexGrow={1} h={300} borderRadius={10}></Skeleton>
        <Skeleton px={5} flexGrow={1} h={300} borderRadius={10}></Skeleton>
      </Flex>
      <Skeleton px={5} flexGrow={1} h={300} borderRadius={10}></Skeleton>
    </Box>
  );
}
