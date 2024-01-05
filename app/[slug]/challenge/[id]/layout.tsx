import fetchTopic from "@/functions/fetchTopic";
import Sidebar from "./Challenge/Sidebar/Sidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
    id: string;
  };
}

export default async function layout({ children, params }: Props) {
  const session = await getServerSession(authOptions);

  let tasksData: TaskData[] | undefined = undefined;

  if (session) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/tasks-users/`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: ["userTasks"] },
    });

    tasksData = await response.json();
  }

  const topicData = fetchTopic(params.slug);
  const topic: Topic = await topicData;

  return (
    <>
      <Sidebar topic={topic} params={params} tasksData={tasksData} />
      {children}
    </>
  );
}
