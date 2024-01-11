"use server";

import { encodeWithCodeblocks } from "@/functions/editingCode";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function createTask(formData: FormData, options: { taskID?: number }) {
  const { taskID } = options;
  const data = Object.fromEntries(formData);
  data.description = encodeWithCodeblocks(data.description as string);

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
    revalidateTag("topic");
    const resData = await response.json();

    return { message: "Success!", status: "success", taskID: resData.id };
  } catch (e) {
    return { message: "Failed", status: "failed" };
  }
}
