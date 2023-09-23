"use client";
import Image from "next/image";
import styles from "./components/Body.module.scss";
import { Flex } from "@chakra-ui/react";
import Title from "./components/Title";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  let err;
  if (error.message === "fetch failed") {
    err = (
      <>
        <Image src={"https://svgshare.com/i/xsY.svg"} alt="Database Error" height={50} width={50} />
        <strong>Database connection error</strong>
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
