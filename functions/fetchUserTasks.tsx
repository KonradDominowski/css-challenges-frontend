export default async function fetchUserTasks(accessToken: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/tasks-users/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
      next: { tags: ["userTasks"] },
    });
    return await response.json();
  } catch (err) {}
}
