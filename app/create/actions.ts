"use server";

import { revalidatePath } from "next/cache";

const formatDescription = (text: string) => {
  const words = text.split(" ");
  let formattedWords = words.map((word) => {
    if (word.startsWith("{{") && word.endsWith("}}")) {
      return word.replace("{{", '<span class="code">').replace("}}", "</span>");
    } else {
      return word;
    }
  });

  return formattedWords.join(" ");
};

export default async function createTask(formData: FormData) {
  const data = Object.fromEntries(formData);
  data.description = formatDescription(data.description as string);
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/tasks/`, {
      method: "post",
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
