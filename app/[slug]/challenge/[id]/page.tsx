import { Metadata } from "next";
import { Suspense } from "react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChallengePage from "@/app/[slug]/challenge/[id]/Challenge/ChallengePage";
import LoadingChallenge from "@/app/components/Loadings/Challenge";
import fetchTopic from "@/functions/fetchTopic";
import fetchUserTasks from "@/functions/fetchUserTasks";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic: Topic = await fetchTopic(params.slug);

  const task = topic.chapters!.flatMap((chapter) => chapter.tasks).find((task) => task.id === +params.id)!;

  return {
    title: `${task.title} - ${topic.title}`,
  };
}

export default function Challenge({ params }: Props) {
  return (
    <Suspense fallback={<LoadingChallenge />}>
      <ChallengeLayout params={params} />
    </Suspense>
  );
}

async function ChallengeLayout({ params }: Props) {
  const session = await getServerSession(authOptions);

  let tasksData: TaskData[] | undefined = undefined;

  if (session?.accessToken) {
    tasksData = await fetchUserTasks(session.accessToken);
  }

  const topic = await fetchTopic(params.slug);

  return <ChallengePage topic={topic} tasksData={tasksData} params={params} session={session} />;
}
