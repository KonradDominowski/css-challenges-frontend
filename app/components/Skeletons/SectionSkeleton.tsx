import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

import styles from "./../Section.module.scss";

export default function SectionSkeleton() {
  return (
    <Box className={styles.section} style={{ border: "none" }}>
      <Skeleton borderRadius={20}>
        <Box height={200} width={200} />
      </Skeleton>
      <SkeletonText noOfLines={1} mb={3} skeletonHeight={5}>
        <h2>Title</h2>
      </SkeletonText>
      <SkeletonText noOfLines={2} spacing={3} borderRadius={10}>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing.</span>
      </SkeletonText>
    </Box>
  );
}
