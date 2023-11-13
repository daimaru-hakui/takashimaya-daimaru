"use client";
import { headerLinks } from "@/utils/header-link";
import { Box, Flex, Paper } from "@mantine/core";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { MdLogout } from "react-icons/md";
import NavBarItem from "./nav-bar-item";
import NavDrawer from "./nav-drawer";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/client";
import { CurrentUser, useStore } from "@/store";

const NabBar: FC = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    const getUser = async () => {
      const uid = auth.currentUser?.uid || "";
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) return;
      setCurrentUser({ ...docSnap.data(), id: docSnap.id } as CurrentUser);
    };
    getUser();
  }, [setCurrentUser]);

  const logout = () => {
    signOut();
  };

  return (
    <Box
      component="header"
      w="100%"
      bg="white"
      pos="sticky"
      top={0}
      style={{ zIndex: 100 }}
    >
      <Paper shadow="xs">
        <Flex
          w="100%"
          maw={1300}
          h={50}
          px="lg"
          mx="auto"
          justify="space-between"
          align="center"
        >
          <Link href="/dashboard">
            <Box fw="bold">髙島屋様ポータルサイト</Box>
          </Link>
          <Flex gap={16} display={{ base: "none", md: "flex" }}>
            <Flex gap={16}>
              {headerLinks.map(({ title, path, icon, target }, idx) => (
                <Link
                  key={idx}
                  href={path}
                  rel="noopener noreferrer"
                  target={target ? "_blank" : ""}
                >
                  <NavBarItem title={title} icon={icon} />
                </Link>
              ))}
            </Flex>
            <NavBarItem
              title="ログアウト"
              icon={<MdLogout />}
              onClick={logout}
            />
          </Flex>
          <Flex h="100%" align="center" display={{ base: "flex", md: "none" }}>
            <NavDrawer />
          </Flex>
        </Flex>
      </Paper>
    </Box>
  );
};

export default NabBar;
