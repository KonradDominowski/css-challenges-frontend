import { getServerSession } from "next-auth";
import TaskForm from "@/app/components/TaskForm/TaskForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function CreateChallenge({ params }: Props) {
  const session = await getServerSession();

  // if (!(session?.user?.email === "konrad.dominowski@gmail.com")) {
  //   return <p>This page is only available for the admin.</p>;
  // }

  const topicsResponse = await fetch(`${process.env.BACKEND_URL}/api/topics/`);
  const topics: Topic[] = await topicsResponse.json();

  const chaptersResponse = await fetch(`${process.env.BACKEND_URL}/api/chapters/`);
  const chapters: Chapter[] = await chaptersResponse.json();

  const taskResponse = await fetch(`${process.env.BACKEND_URL}/api/tasks/${params.id}/`);
  const task: Task = await taskResponse.json();

  return <TaskForm topics={topics} chapters={chapters} task={task} />;
}
