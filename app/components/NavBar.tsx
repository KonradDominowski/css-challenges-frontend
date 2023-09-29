"use client";
import { Flex, Box, HStack, useColorModeValue, SystemStyleObject } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { nunito } from "./../layout";
import styles from "./NavBar.module.scss";
import alogo from "../../media/alogo.svg";
import { SignInButton, SignOutButton } from "./Buttons";

const links: Link[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Add new task",
    href: "/create",
  },
];

export default function NavBar() {
  const { status } = useSession();

  const linkColor = useColorModeValue("rgb(100, 100, 100)", "rgb(240,240,240)");
  const linkColorHover = useColorModeValue("rgb(0, 0, 0)", "rgb(255,255,255)");

  const navBorder: SystemStyleObject = {
    border: "solid 0.5px",
    borderImage: `linear-gradient(90deg,
      rgba(48, 48, 255, 0) 0%,
      var(--main-color-dimmed) 40%,
      var(--main-color-dimmed) 60%,
      rgba(48, 48, 255, 0) 100%)`,
    borderImageSlice: `0 0 100 0`,
  };

  return (
    <Flex
      as="nav"
      className={nunito.className}
      align={"center"}
      justify={"space-between"}
      position={"sticky"}
      top={0}
      zIndex={10}
      height={"4rem"}
      fontWeight={700}
      sx={navBorder}
      px={2}
    >
      <HStack>
        <Link href={"/"}>
          <Image className={styles.logo} src={alogo} alt="logo" />
        </Link>
        <HStack align={"center"} paddingLeft={"1rem"} fontSize={"medium"} spacing={2}>
          {links.map((link, i) => (
            <Box
              key={i}
              as={"a"}
              p={2}
              href={link.href}
              transition={"0.1s"}
              color={linkColor}
              _hover={{
                color: linkColorHover,
              }}
            >
              {link.name}
            </Box>
          ))}
        </HStack>
      </HStack>

      <Flex align={"center"} gap={2}>
        <SignInButton />

        {status === "authenticated" && <SignOutButton />}
      </Flex>
    </Flex>
  );
}
