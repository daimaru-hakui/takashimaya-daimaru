"use client";
import { Box, Flex } from "@mantine/core";
import { PropsWithChildren, useEffect } from "react";
import NabBar from "../components/nav/nav-bar";
import { CurrentUser, useStore } from "@/store";
import { auth, db } from "@/firebase/client";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { type Project } from "@/types";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setProjects = useStore((state) => state.setProjects);
  const session = useSession();

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

  useEffect(() => {
    const getProjects = async () => {
      const docsRef = collection(db, "projects");
      const q = query(
        docsRef,
        where("deletedAt", "==", null),
        where("isCompleted", "==", false),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        setProjects(
          snapshot.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
                createdAt: format(
                  new Date(doc.data().createdAt.toDate()),
                  "yyyy-MM-dd"
                ),
              } as Project)
          )
        );
      });
    };
    getProjects();
  }, [setProjects]);

  useEffect(() => {
    if (session) {
      if (!session.data?.user.email) return;
      const docRef = doc(db, "users", `${session.data?.user.uid}`);
      const addAuthority = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return;
        await setDoc(docRef, {
          email: session.data?.user.email,
          isAdmin: false,
          isEditor: false,
        });
      };
      addAuthority();
    }
  }, [session]);

  return (
    <Flex w="100%" mih="100vh" direction="column" bg="#f4f4f4">
      <NabBar />
      <Box w="100%" maw={1300} mx="auto" mih={"calc(100vh - 50px)"} p="lg">
        {children}
      </Box>
    </Flex>
  );
}
