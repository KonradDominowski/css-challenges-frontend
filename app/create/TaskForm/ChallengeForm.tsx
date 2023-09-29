"use client";

import CodeEditor from "@/app/components/Editors";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import styles from "./ChallengeForm.module.scss";
import TargetAndOutput from "@/app/components/TargetAndOutput";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  HTMLcode: string;
  setHTMLcode: React.Dispatch<React.SetStateAction<string>>;
  CSScode: string;
  setCSScode: React.Dispatch<React.SetStateAction<string>>;
  starterHTMLcode: string;
  setStarterHTMLcode: React.Dispatch<React.SetStateAction<string>>;
  starterCSScode: string;
  setStarterCSScode: React.Dispatch<React.SetStateAction<string>>;
  srcDoc: string;
  setSrcDoc: React.Dispatch<React.SetStateAction<string>>;
  starterSrcDoc: string;
  setStarterSrcDoc: React.Dispatch<React.SetStateAction<string>>;
}

const updateSrcDoc = (html: string, css: string, updateSrc: React.Dispatch<React.SetStateAction<string>>) => {
  updateSrc(`
        <html lang="en">
          <body>${html}</body>
          <style>
              body {
                background-color: white
              }
          ${css}
          </style>
        </html>
      `);
};

export default function ChallengeForm({
  title,
  setTitle,
  description,
  setDescription,
  srcDoc,
  setSrcDoc,
  HTMLcode,
  setHTMLcode,
  CSScode,
  setCSScode,
  starterHTMLcode,
  setStarterHTMLcode,
  starterCSScode,
  setStarterCSScode,
  starterSrcDoc,
  setStarterSrcDoc,
}: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSrcDoc(HTMLcode, CSScode, setSrcDoc);
    }, 50);

    return () => clearTimeout(timeout);
  }, [HTMLcode, CSScode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSrcDoc(starterHTMLcode, starterCSScode, setStarterSrcDoc);
    }, 50);

    return () => clearTimeout(timeout);
  }, [starterHTMLcode, starterCSScode]);

  return (
    <div className={styles.main} id="main">
      <Flex alignItems={"center"} justify={"left"} pt={4}>
        <Textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          p={0}
          fontSize={"3rem"}
          placeholder="Title placeholder"
          resize={"none"}
          borderColor={"rgba(0,0,0,0)"}
        />
      </Flex>
      <Textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.description}
        p={0}
        placeholder="Put task description here"
        resize={"vertical"}
        borderColor={"rgba(0,0,0,0)"}
      />
      <div>
        <Box resize={"horizontal"} minW={"600px"} maxW={"100%"} overflow={"auto"}>
          <Flex gap={3}>
            <Box flexGrow={1} overflow={"auto"}>
              <Card px={5} my={3}>
                <CardHeader p={4} pb={3} color={"gray"} fontWeight={500}>
                  Target
                </CardHeader>
                <Divider color={"gray.200"} />
                <iframe id="target" title="target" height={300} sandbox="allow-scripts " srcDoc={srcDoc} />
              </Card>
            </Box>
            <Box flexGrow={1} overflow={"auto"}>
              <Card px={5} my={3}>
                <CardHeader p={4} pb={3} color={"gray"} fontWeight={500}>
                  Start from
                </CardHeader>
                <Divider color={"gray.200"} />
                <iframe id="target" title="target" height={300} sandbox="allow-scripts " srcDoc={starterSrcDoc} />
              </Card>
            </Box>
          </Flex>
        </Box>
        <Card bg={"#011627"} borderRadius={10}>
          <Tabs variant={"unstyled"} px={4} py={2}>
            <TabList color={"white"}>
              <Tab fontSize={"1.1rem"} fontWeight={500}>
                Target code
              </Tab>
              <Tab fontSize={"1.1rem"} fontWeight={500}>
                Starter code
              </Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                <CodeEditor
                  HTMLcode={HTMLcode}
                  setHTMLcode={setHTMLcode}
                  CSScode={CSScode}
                  setCSScode={setCSScode}
                  form
                />
              </TabPanel>
              <TabPanel>
                <CodeEditor
                  HTMLcode={starterHTMLcode}
                  setHTMLcode={setStarterHTMLcode}
                  CSScode={starterCSScode}
                  setCSScode={setStarterCSScode}
                  form
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
        <VisuallyHiddenInput type="text" name="target" readOnly value={srcDoc} />
        <VisuallyHiddenInput type="text" name="starter_html_code" readOnly value={starterHTMLcode} />
        <VisuallyHiddenInput type="text" name="starter_css_code" readOnly value={starterCSScode} />
      </div>
    </div>
  );
}
