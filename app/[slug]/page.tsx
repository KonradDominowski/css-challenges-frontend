import TopicOverview from "./TopicOverview";
import { Suspense } from "react";
import TopicOverviewSkeleton from "../components/Skeletons/TopicOverviewSkeleton";
import fetchTopic from "@/functions/fetchTopic";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic: Topic = await fetchTopic(params.slug);

  return {
    title: topic.title,
  };
}

export default function SectionPage({ params }: Props) {
  return (
    <Suspense fallback={<TopicOverviewSkeleton />}>
      <Topic params={params} />
    </Suspense>
  );
}

// TODO - I dont know why, but the topics cache is too strong and doesnt refresh often enough
async function Topic({ params }: Props) {
  const topic = await fetchTopic(params.slug);

  return <TopicOverview topic={topic} params={params} />;
}
