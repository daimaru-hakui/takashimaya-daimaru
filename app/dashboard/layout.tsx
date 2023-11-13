"use client";
import { Box, Flex } from "@mantine/core";
import { PropsWithChildren } from "react";
import NabBar from "../components/nav/nav-bar";
import { CurrentUser, useStore } from "@/store";
import { auth, db } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  onAuthStateChanged(auth, async (session) => {
    if (session) {
      const docRef = doc(db, "users", session.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) return;
      setCurrentUser({ ...docSnap.data(), id: docSnap.id } as CurrentUser);
    } else {
      setCurrentUser(null);
    }
  });

  return (
    <Flex w="100%" mih="100vh" direction="column" bg="#f4f4f4">
      <NabBar />
      <Box w="100%" maw={1300} mx="auto" mih={"calc(100vh - 50px)"} p="lg">
        {children}
      </Box>
    </Flex>
  );
}
