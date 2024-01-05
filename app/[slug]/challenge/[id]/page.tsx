import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChallengePage from "@/app/[slug]/challenge/[id]/Challenge/ChallengePage";
import fetchTopic from "@/functions/fetchTopic";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

// TODO - generate metadata: page title dynamically
// TODO - lodaing screen and maybe change layout so that sidebar is seperate
export default async function ChallengeLayout({ params }: Props) {
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

  return <ChallengePage topic={topic} tasksData={tasksData} params={params} session={session} />;
}
