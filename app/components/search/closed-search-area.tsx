"use client";
import React, { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useStore } from "@/store";
import { Project } from "@/types";
import { Button, Flex, TextInput } from "@mantine/core";

const ClosedSearchArea = () => {
  const setClosedProjects = useStore((state) => state.setClosedProjects);

  useEffect(() => {
    const getClosedProjects = async () => {
      const docsRef = collection(db, "projects");
      const q = query(
        docsRef,
        where("deletedAt", "==", null),
        where("isCompleted", "==", true),
        orderBy("createdAt", "desc"),
      );
      const snapShot = await getDocs(q);
      const result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      } as Project));
      setClosedProjects(result)
    };
    getClosedProjects()
  }, [setClosedProjects]);



  return (
    <Flex mt="md" mb="lg" justify="space-between" gap="lg">
      <Flex gap="lg" align="flex-end">
        <TextInput type="date" label="開始" />
        <TextInput type="date" label="終了" />
        <Button>検索</Button>
      </Flex>
    </Flex>
  );
};

export default ClosedSearchArea;
