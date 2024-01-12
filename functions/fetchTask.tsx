export default async function fetchTask(id: string) {
  try {
    const task = await fetch(`${process.env.BACKEND_URL}/api/tasks/${id}/`, {
      cache: "force-cache",
      next: { tags: ["topic"], revalidate: 3600 },
    });
    if (!task.ok) throw new Error();
    return task.json();
  } catch (err) {}
}
