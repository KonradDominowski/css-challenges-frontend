export default async function fetchChapters() {
  try {
    const topics = await fetch(`${process.env.BACKEND_URL}/api/chapters/`, {
      cache: "force-cache",
      next: { tags: ["chapters"] },
    });
    if (!topics.ok) throw new Error();
    return topics.json();
  } catch (err) {}
}
