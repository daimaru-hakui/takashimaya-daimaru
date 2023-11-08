"use client";
import { Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ProjectTableRow from "./project-table-row";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Project } from "@/types";

const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const docsRef = collection(db, "projects");
      const q = query(docsRef);
      onSnapshot(q, (snapshot) => {
        setProjects(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Project
        )));
      });
    };
    getProjects();
  }, []);


  return (
    <Table mt={24}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>登録日</Table.Th>
          <Table.Th>案件名</Table.Th>
          <Table.Th>担当者名</Table.Th>
          <Table.Th>売上規模</Table.Th>
          <Table.Th>納期</Table.Th>
          <Table.Th>進捗率</Table.Th>
          <Table.Th>ステータス</Table.Th>
          <Table.Th>コメント</Table.Th>
          <Table.Th ta="center">編集</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {projects.map((project) => (
          <ProjectTableRow key={project.id} project={project} />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default ProjectTable;
