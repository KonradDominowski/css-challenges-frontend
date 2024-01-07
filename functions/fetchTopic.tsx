export default async function fetchTopic(slug: string) {
  try {
    const topicRes = await fetch(`${process.env.BACKEND_URL}/api/topics/${slug}/`, { cache: "force-cache" });
    if (!topicRes.ok) throw new Error();
    return topicRes.json();
  } catch (err) {}
}
