"use client";
import { Box, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Project } from "@/types";
import { useStore } from "@/store";
import ProjectsTableRow from "../../projects/components/projects-table-row";

const ClosedProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterProjects, setFilterProjects] = useState<Project[]>(projects);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const getProjects = async () => {
      const docsRef = collection(db, "projects");
      const q = query(
        docsRef,
        where("deletedAt", "==", null),
        where("isCompleted", "==", true),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        setProjects(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Project
        )));
      });
    };
    getProjects();
  }, []);

  useEffect(() => {
    const clear = setTimeout(() => {
      setFilterProjects(projects.filter((project) => (
        project.title.includes(searchText)
      )));
    }, 500);
    return () => {
      clearTimeout(clear);
    };
  }, [projects, searchText]);

  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt={24} w="100%" miw={1000}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>登録日</Table.Th>
            <Table.Th>案件名</Table.Th>
            <Table.Th>担当者名</Table.Th>
            <Table.Th>担当者名</Table.Th>
            <Table.Th>種別</Table.Th>
            <Table.Th>売上規模</Table.Th>
            <Table.Th>納期</Table.Th>
            <Table.Th>進捗率</Table.Th>
            <Table.Th>ステータス</Table.Th>
            <Table.Th>アクション</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filterProjects.map((project) => (
            <ProjectsTableRow key={project.id} project={project} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default ClosedProjectTable;
