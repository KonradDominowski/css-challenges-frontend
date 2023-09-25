"use client";

import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import styles from "./../../[slug]/page.module.scss";

export default function TopicOverviewSkeleton() {
  return (
    <Box className={styles.main} maxW={960} m={"auto"} my={10}>
      <Flex justify={"left"} gap={7} align={"center"} mb={5}>
        <Skeleton borderRadius={20}>
          <Box w={130} h={150}>
            .
          </Box>
        </Skeleton>
        <Skeleton h={"70px"}>
          <h1>Title Title</h1>
        </Skeleton>
      </Flex>

      <Box py={4}>
        <SkeletonText w={"70%"} noOfLines={5} spacing={3} borderRadius={10} />

        <Skeleton w={150} mt={4} mb={2}>
          <Box h={"36px"}>.</Box>
        </Skeleton>

        <SkeletonText mt={3} w={130} noOfLines={4} spacing={3} borderRadius={10} />
      </Box>
    </Box>
  );
}
