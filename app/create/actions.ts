"use server";

import { revalidatePath } from "next/cache";

const formatWithCodeblocks = (text: string) => {
  return text.replaceAll("{{", '<span class="code">').replaceAll("}}", "</span>");
};

export default async function createTask(formData: FormData, options: { taskID?: number }) {
  const { taskID } = options;
  const data = Object.fromEntries(formData);
  data.description = formatWithCodeblocks(data.description as string);

  let url: string, method: string;

  if (taskID) {
    url = `${process.env.BACKEND_URL}/api/tasks/${taskID}/`;
    method = "put";
  } else {
    url = `${process.env.BACKEND_URL}/api/tasks/`;
    method = "post";
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error();
    revalidatePath("/create");
    const resData = await response.json();

    return { message: "Success!", status: "success", taskID: resData.id };
  } catch (e) {
    return { message: "Failed", status: "failed" };
  }
}
