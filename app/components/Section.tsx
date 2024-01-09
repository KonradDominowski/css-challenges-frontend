import { Session } from "next-auth";

import { Icon, Image } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

import styles from "./Section.module.scss";
import { use } from "react";

interface Props {
  topic: Topic;
  session: Session | null;
  userTasks: TaskData[] | undefined;
}

export default function Section({ topic, session, userTasks }: Props) {
  const { title, short_description, slug, is_ready, logo_url } = topic;

  // TODO - use userTasks to display the progress in each topic
  if (session) {
    const topicTasks = topic.chapters?.flatMap((chapter) => chapter.tasks).filter((task) => task.topic === topic.id);
  }

  return (
    <Link href={slug} className={`${styles.section} ${!is_ready ? styles.disabled : ""}`}>
      {/* <Icon as={FaCheckCircle} boxSize={8} color={"green.400"} pos={"absolute"} top={3} left={3} /> */}
      <Image src={logo_url} alt={"logo"} height={200} width={200} />
      <h2>{title}</h2>
      <span>{short_description}</span>
    </Link>
  );
}
