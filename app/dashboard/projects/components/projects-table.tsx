"use client";
import { Box, Table } from "@mantine/core";
import React, { useEffect } from "react";
import ProjectsTableRow from "./projects-table-row";
import { useStore } from "@/store";

const ProjectTable = () => {
  const projects = useStore((state) => state.projects);
  const searchText = useStore((state) => state.searchText);
  const filterProjects = useStore((state) => state.filterProjects);
  const setFilterProjects = useStore((state) => state.setFilterProjects);

  useEffect(() => {
    const clear = setTimeout(() => {
      setFilterProjects(
        projects.filter((project) => project.title.includes(searchText))
      );
    }, 500);
    return () => {
      clearTimeout(clear);
    };
  }, [projects, searchText, setFilterProjects]);

  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt={24} w="100%" miw={1200}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={110}>登録日</Table.Th>
            <Table.Th w={200}>案件名</Table.Th>
            <Table.Th w={100}>担当者名</Table.Th>
            <Table.Th w={100}>担当者名</Table.Th>
            <Table.Th w={100}>種別</Table.Th>
            <Table.Th w={100}>売上規模</Table.Th>
            <Table.Th w={110}>納期</Table.Th>
            <Table.Th w={100}>進捗率</Table.Th>
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

export default ProjectTable;
