"use client";
import React, { useEffect, useState } from "react";

import { Box, Flex, Text, VisuallyHiddenInput } from "@chakra-ui/react";

import CodeEditor from "@/app/components/Editors";
import TargetAndOutput from "@/app/components/TargetAndOutput";

import styles from "./ChallengePreview.module.scss";

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
  const [showOutline, setShowOutline] = useState(false);

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

  let classes = styles.description;
  if (hideDesc) classes += ` ${styles.hidden}`;
  if (showOutline) classes += ` ${styles.outline}`;

  return (
    <>
      <div className={styles.main} id="main">
        <VisuallyHiddenInput type="text" autoFocus />
        <Flex alignItems={"center"} justify={"space-between"}>
          <h1>{title}</h1>
        </Flex>
        <Text
          className={classes}
          py={3}
          borderRadius={5}
          onClick={() => setHideDesc((state) => !state)}
          onMouseEnter={() => setShowOutline(true)}
          onMouseLeave={() => setShowOutline(false)}
          id="description"
          dangerouslySetInnerHTML={{ __html: !hideDesc ? description : description.slice(0, 60) }}
        ></Text>
        <div>
          <Box mb={4} minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
            <TargetAndOutput target={target} output={srcDoc} />
          </Box>
          <CodeEditor HTMLcode={HTMLcode} setHTMLcode={setHTMLcode} CSScode={CSScode} setCSScode={setCSScode} />
        </div>
      </div>
    </>
  );
}
