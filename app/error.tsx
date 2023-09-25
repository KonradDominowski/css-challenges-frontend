"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Flex, IconButton } from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";

import Title from "./components/Title";
import revalidateData from "./actions";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  const refetchTopics = async () => {
    // TODO - maybe there is better way to revalidate this path
    await revalidateData();
  };

  let err;
  if (error.message === "fetch failed") {
    err = (
      <>
        <Image
          src={"https://svgshare.com/i/xsY.svg"}
          alt="Database Error"
          height={50}
          width={50}
          style={{ transform: "translate(3px)" }}
        />
        <strong>Database connection error, try refreshing the page</strong>
        {/* <form action={refetchTopics}>
          <IconButton type="submit" colorScheme="teal" aria-label="Reload button" icon={<AiOutlineReload />} />
        </form> */}
      </>
    );
  } else {
    err = (
      <>
        <Image src={"https://www.svgrepo.com/show/521279/error-16.svg"} alt="Database Error" height={50} width={50} />
        <strong>There was an unknown error</strong>
      </>
    );
  }

  return (
    <>
      <Title />
      <Flex direction={"column"} align={"center"} justify={"center"} gap={3}>
        {err}
      </Flex>
    </>
  );
}
