import { Metadata } from "next";

import { getServerSession } from "next-auth";
import TaskForm from "@/app/components/TaskForm/TaskForm";
import fetchAllTopics from "@/functions/fetchAllTopics";
import fetchChapters from "@/functions/fetchChapters";
import fetchTask from "@/functions/fetchTask";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const task: Task = await fetchTask(params.id);

  return {
    title: `Edit task - ${task.title}`,
  };
}

export default async function CreateChallenge({ params }: Props) {
  const session = await getServerSession();

  if (session?.user?.email !== "konrad.dominowski@gmail.com") {
    return <p>This page is only available for the admin.</p>;
  }

  const topics: Topic[] = await fetchAllTopics();
  const chapters: Chapter[] = await fetchChapters();
  const task: Task = await fetchTask(params.id);

  return <TaskForm topics={topics} chapters={chapters} task={task} />;
}
