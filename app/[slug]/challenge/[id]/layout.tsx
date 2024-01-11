import Sidebar from "./Challenge/Sidebar/Sidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fetchTopic from "@/functions/fetchTopic";
import fetchUserTasks from "@/functions/fetchUserTasks";
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

  if (session?.accessToken) {
    tasksData = await fetchUserTasks(session.accessToken);
  }

  const topic = await fetchTopic(params.slug);

  return (
    <>
      <Sidebar topic={topic} params={params} tasksData={tasksData} />
      {children}
    </>
  );
}
