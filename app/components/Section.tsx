import { Session } from "next-auth";

import { Icon, Image } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "@chakra-ui/next-js";

import styles from "./Section.module.scss";

interface Props {
  topic: Topic;
  session: Session | null;
  userTasks: TaskData[] | undefined;
}

export default function Section({ topic, session, userTasks }: Props) {
  const { title, short_description, slug, is_ready, logo_url } = topic;

  // TODO - use userTasks to display the progress in each topic
  let completed = false;
  if (session) {
    const topicTasks = topic.chapters?.flatMap((chapter) => chapter.tasks).filter((task) => task.topic === topic.id);

    if (topicTasks?.length === userTasks?.length) completed = true;
  }

  return (
    <Link
      href={slug}
      className={`${styles.section} ${!is_ready ? styles.disabled : ""} ${completed ? styles.completed : ""}`}
    >
      {completed && <Icon as={FaCheckCircle} boxSize={8} color={"green.400"} pos={"absolute"} top={3} right={3} />}
      <Image src={logo_url} alt={"logo"} height={200} width={200} />
      <h2>{title}</h2>
      <span>{short_description}</span>
    </Link>
  );
}
