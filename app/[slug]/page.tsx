import TopicOverview from "./TopicOverview";
import { Suspense } from "react";
import TopicOverviewSkeleton from "../components/Skeletons/TopicOverviewSkeleton";
import fetchTopic from "@/functions/fetchTopic";

interface Props {
  params: {
    slug: string;
  };
}

export default function SectionPage({ params }: Props) {
  return (
    <Suspense fallback={<TopicOverviewSkeleton />}>
      <Topic params={params} />
    </Suspense>
  );
}

async function Topic({ params }: Props) {
  const topic = await fetchTopic(params.slug);

  return <TopicOverview topic={topic} params={params} />;
}
