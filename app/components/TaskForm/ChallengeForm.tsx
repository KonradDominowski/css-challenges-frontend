"use client";
import { useEffect, useRef, useState } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import CodeEditor from "@/app/components/Editors";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Code,
  Divider,
  Flex,
  Kbd,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VisuallyHiddenInput,
} from "@chakra-ui/react";

import styles from "./ChallengeForm.module.scss";

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
  const previousDescription = useRef(description);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSrcDoc(HTMLcode, CSScode, setSrcDoc);
    }, 50);

    return () => clearTimeout(timeout);
  }, [HTMLcode, CSScode, setSrcDoc]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSrcDoc(starterHTMLcode, starterCSScode, setStarterSrcDoc);
    }, 50);

    return () => clearTimeout(timeout);
  }, [starterHTMLcode, starterCSScode, setStarterSrcDoc]);

  // TODO - the caret moves to the end of the text, I want it to stay at the same place
  function wrapInBraces(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const keys = ["{", "[", "/"];

    if (e.ctrlKey && keys.includes(e.key)) {
      e.preventDefault();
      const textArea = descriptionRef.current;
      if (!textArea) return;

      const openingBrackets = e.key + e.key;

      let closingBrackets: closingBrackets;
      if (e.key === "{") closingBrackets = "}}";
      else if (e.key === "[") closingBrackets = "]]";
      else closingBrackets = "\\\\";

      if (textArea.selectionStart != textArea.selectionEnd) {
        let newText =
          textArea.value.substring(0, textArea.selectionStart) +
          openingBrackets +
          textArea.value.substring(textArea.selectionStart, textArea.selectionEnd) +
          closingBrackets +
          textArea.value.substring(textArea.selectionEnd);

        previousDescription.current = description;
        setDescription(newText);
      }
    }

    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      setDescription(previousDescription.current);
    }
  }

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
      <Box pos={"relative"} w={"60%"}>
        <Textarea
          ref={descriptionRef}
          autoFocus
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={wrapInBraces}
          color={"rgb(90, 90, 90)"}
          fontWeight={500}
          lineHeight={"1.3rem"}
          letterSpacing={"0.3px"}
          p={0}
          minH={"200px"}
          placeholder="Put task description here"
          borderColor={"rgba(0,0,0,0)"}
        />
        <Popover trigger="hover" placement="right">
          <PopoverTrigger>
            <InfoOutlineIcon boxSize={5} pos={"absolute"} right={"-1.5rem"} top={"0.3rem"} />
          </PopoverTrigger>
          <PopoverContent fontSize={"0.85rem"}>
            <PopoverArrow />
            <PopoverBody>
              <Text>
                <Kbd>ctrl</Kbd> + <Kbd>{"{"}</Kbd> - Wrap Code <Code>{"{{ }}"}</Code>
              </Text>
              <Divider />
              <Text>
                <Kbd>ctrl</Kbd> + <Kbd>{"["}</Kbd> - Ordered List <Code>{"[[ ]]"}</Code>
                <Divider />
                <Kbd>ctrl</Kbd> + <Kbd>/</Kbd> - List Item <Code>{"// \\\\"}</Code>
              </Text>
              <Divider />
              <Text>
                <Kbd>ctrl</Kbd> + <Kbd>shift</Kbd> + <Kbd>P</Kbd> - Toggle Preview
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
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
