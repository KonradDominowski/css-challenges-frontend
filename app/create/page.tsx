import { getServerSession } from "next-auth";
import TaskForm from "../components/TaskForm/TaskForm";
import fetchAllTopics from "@/functions/fetchAllTopics";
import fetchChapters from "@/functions/fetchChapters";

export default async function CreateChallenge() {
  const session = await getServerSession();

  if (session?.user?.email !== "konrad.dominowski@gmail.com") {
    return <p>This page is only available for the admin.</p>;
  }

  const topics = await fetchAllTopics();
  const chapters = await fetchChapters();

  return <TaskForm topics={topics} chapters={chapters} />;
}
