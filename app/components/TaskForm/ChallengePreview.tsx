"use client";
import React, { useEffect, useState } from "react";

import { Box, Flex, Text, VisuallyHiddenInput } from "@chakra-ui/react";

import CodeEditor from "@/app/components/Editors";
import TargetAndOutput from "@/app/components/TargetAndOutput";

interface Props {
  title: string;
  description: string;
  target: string;
  starter_html_code: string | null;
  starter_css_code: string | null;
}

export default function ChallengePreview({ title, description, target, starter_html_code, starter_css_code }: Props) {
  const [HTMLcode, setHTMLcode] = useState<string>(starter_html_code || "");
  const [CSScode, setCSScode] = useState<string>(starter_css_code || "");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [hideDesc, setHideDesc] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html lang="en">
        <body>${HTMLcode}</body>
        <style>
        body {
          background-color: white
        }
        ${CSScode}</style>
      </html>
    `);
    }, 50);

    return () => clearTimeout(timeout);
  }, [HTMLcode, CSScode]);

  let hiddenStyles: React.CSSProperties = {};
  if (hideDesc) {
    hiddenStyles = {
      WebkitMaskImage: "linear-gradient(120deg, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 60%)",
      maskImage: "linear-gradient(120deg, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 60%)",
    };
  }

  return (
    <Box ml={"12rem"} mr={"1rem"} pl={"2rem"}>
      <VisuallyHiddenInput type="text" autoFocus />
      <Flex alignItems={"center"} justify={"space-between"}>
        <Text as={"h1"} pt={"1rem"} fontSize={"3rem"} fontWeight={400}>
          {title}
        </Text>
      </Flex>
      <Text
        py={3}
        borderRadius={10}
        w={"60%"}
        cursor={"pointer"}
        color={"rgb(90, 90, 90)"}
        lineHeight={"1.3rem"}
        fontWeight={500}
        letterSpacing={"0.5px"}
        transition={"0.15s"}
        _hover={{
          boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.08)",
        }}
        style={hiddenStyles}
        onClick={() => setHideDesc((state) => !state)}
        id="description"
        dangerouslySetInnerHTML={{ __html: !hideDesc ? description : description.slice(0, 60) }}
      ></Text>
      <div>
        <Box mb={4} minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
          <TargetAndOutput target={target} output={srcDoc} />
        </Box>
        <CodeEditor HTMLcode={HTMLcode} setHTMLcode={setHTMLcode} CSScode={CSScode} setCSScode={setCSScode} />
      </div>
    </Box>
  );
}
