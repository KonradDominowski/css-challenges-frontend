export default async function fetchUserTasks(accessToken: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/tasks-users/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["userTasks"] },
      cache: "force-cache",
    });
    return await response.json();
  } catch (err) {}
}
