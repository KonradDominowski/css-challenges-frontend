"use client";

import { Box, Flex, UnorderedList, ListItem, Text, Button } from "@chakra-ui/react";
import styles from "./page.module.scss";
import Image from "next/image";

interface Props {
  topic: Topic;
  params: {
    slug: string;
  };
}

export default function TopicOverview({ topic, params }: Props) {
  const tasks = topic.chapters!.flatMap((el) => el.tasks);
  const taskNumber = tasks.length;

  return (
    <Box className={styles.main} maxW={960} m={"auto"} my={10}>
      <Flex justify={"left"} gap={7} align={"center"} mb={5}>
        <Image src={topic.logo_url} height={150} width={150} style={{ maxHeight: "150px" }} alt="logo" />
        <h1>{topic.title}</h1>
      </Flex>

      <Flex flexDir={"column"} gap={3}>
        <div>
          <h3 style={{ fontWeight: 700 }}>{topic.description?.subtitle}</h3>
          {topic.description?.body.paragraphs.map((paragraph, i) => (
            <Text key={i} mt={4}>
              {paragraph.text}
            </Text>
          ))}
        </div>
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>What You&apos;ll Learn:</h3>
          <UnorderedList>
            {topic.description?.to_learn.items.map((item, i) => (
              <ListItem key={i}>
                <strong>{item.main}</strong>: {item.sub}
              </ListItem>
            ))}
          </UnorderedList>
        </div>
        <div>
          <h3 style={{ fontWeight: 700 }}>Challenges:</h3>
          <p style={{ marginTop: "0.5rem" }}>
            Test your skills with our interactive challenges! Style web pages and enhance your CSS expertise.
          </p>
        </div>
      </Flex>

      <p>
        This topic consists of <b>{topic.chapters!.length} chapters </b> totalling to
        <b> {taskNumber} tasks</b>.
      </p>
      <Button as={"a"} href={`${topic.slug}/challenge/${tasks.at(0)?.id}`} my={3} size={"lg"} colorScheme={"green"}>
        Get Started
      </Button>
    </Box>
  );
}
