export default async function fetchAllTopics() {
  try {
    const topics = await fetch(`${process.env.BACKEND_URL}/api/topics/`, {
      cache: "force-cache",
      next: { tags: ["all-topics"] },
    });
    if (!topics.ok) throw new Error();
    return topics.json();
  } catch (err) {}
}
