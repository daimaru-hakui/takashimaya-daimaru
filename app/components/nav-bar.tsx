"use client";
import { headerLinks } from "@/utils/header-link";
import { Box, Button, Flex, Paper } from "@mantine/core";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import { useHover } from "@mantine/hooks";
import { MdLogout } from "react-icons/md";

const NabBar: FC = () => {
  const { hovered, ref } = useHover();
  const logout = () => {
    signOut();
  };
  return (
    <Box component="header" w="100%" bg="white" pos="sticky" top={0}>
      <Paper shadow="xs">
        <Flex
          w="100%"
          maw={1200}
          h={50}
          px={3}
          mx="auto"
          justify="space-between"
          align="center"
        >
          <Link href="/dashboard">
            <Box>髙島屋様ポータルサイト</Box>
          </Link>
          <Flex gap={20}>
            <Flex gap={12}>
              {headerLinks.map(({ title, path, icon }, idx) => (
                <Link key={idx} href={path}>
                  <Flex
                    gap={6}
                    align="center"
                    ref={ref}
                    style={{ opacity: hovered ? 0.8 : 1, transition: "0.3s" }}
                  >
                    <Flex align="center">{icon}</Flex>
                    <Box fz="sm">{title}</Box>
                  </Flex>
                </Link>
              ))}
            </Flex>
            <Flex
              fz="sm"
              gap={6}
              align="center" style={{ cursor: "pointer" }} onClick={logout}
            >
              <MdLogout /><Box>ログアウト</Box>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Box>
  );
};

export default NabBar;
