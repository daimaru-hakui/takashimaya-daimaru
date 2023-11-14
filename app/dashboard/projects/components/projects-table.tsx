"use client";
import { Box, Table } from "@mantine/core";
import React, { useEffect } from "react";
import ProjectsTableRow from "./projects-table-row";
import { useStore } from "@/store";
import { statusList } from "@/utils/status-list";

const ProjectTable = () => {
  const projects = useStore((state) => state.projects);
  const filterProjects = useStore((state) => state.filterProjects);
  const setFilterProjects = useStore((state) => state.setFilterProjects);
  const searchText = useStore((state) => state.searchText);
  const searchStaff = useStore((state) => state.searchStaff);
  const startAt = useStore((state) => state.startAt);
  const endAt = useStore((state) => state.endAt);
  const searchStatus = useStore((state) => state.searchStatus);

  const getStatus = (statusId: string) => {
    const findStatus = statusList.find((status) => status.value === statusId);
    if (!findStatus) return;
    return findStatus.value;
  };

  useEffect(() => {
    const clear = setTimeout(() => {
      setFilterProjects(
        projects
          .filter((project) => project.title.includes(searchText))
          .filter(
            (project) =>
              project.staff1.includes(searchStaff) ||
              project.staff2.includes(searchStaff)
          )
          .filter((project) => {
            if (!startAt) return project;
            const date1 = new Date(startAt);
            const date2 = new Date(project.deadline);
            if (date1.getTime() <= date2.getTime()) return project;
          })
          .filter((project) => {
            if (!endAt) return project;
            const date1 = new Date(project.deadline);
            const date2 = new Date(endAt);
            if (date1.getTime() <= date2.getTime()) return project;
          })
          .filter((project) => {
            if (!searchStatus) return project;
            if (getStatus(project.status) === searchStatus) return project;
          })
      );
    }, 500);
    return () => {
      clearTimeout(clear);
    };
  }, [
    projects,
    searchText,
    searchStaff,
    startAt,
    endAt,
    searchStatus,
    setFilterProjects,
  ]);

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
