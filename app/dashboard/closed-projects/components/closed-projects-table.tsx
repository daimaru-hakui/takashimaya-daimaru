"use client";
import { Box, Table } from "@mantine/core";
import React, { useEffect } from "react";
import { useStore } from "@/store";
import ProjectsTableRow from "../../projects/components/projects-table-row";
import { useGetClosedProjects } from "@/hooks/useGetClosedProjects";
import { statusList } from "@/utils/status-list";
import Loading from "@/app/components/loader/loading";

const ClosedProjectTable = () => {
  const filterClosedProjects = useStore((state) => state.filterClosedProjects);
  const setFilterClosedProjects = useStore(
    (state) => state.setFilterClosedProjects
  );
  const searchText = useStore((state) => state.searchText);
  const searchStaff = useStore((state) => state.searchStaff);
  const startAt = useStore((state) => state.startAt);
  const endAt = useStore((state) => state.endAt);
  const searchStatus = useStore((state) => state.searchStatus);
  const { data, isLoading, isError } = useGetClosedProjects();

  const getStatus = (statusId: string) => {
    const findStatus = statusList.find((status) => status.value === statusId);
    if (!findStatus) return;
    return findStatus.value;
  };

  useEffect(() => {
    if (!data) return;
    const clear = setTimeout(() => {
      setFilterClosedProjects(
        data
          ?.filter((project) => project.title.includes(searchText))
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
    searchText,
    data,
    setFilterClosedProjects,
    searchStaff,
    startAt,
    endAt,
    searchStatus,
  ]);

  if(isLoading) return <Loading/>

  return (
    <>
      {!isLoading && !isError && (
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
              {filterClosedProjects?.map((project) => (
                <ProjectsTableRow key={project.id} project={project} />
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default ClosedProjectTable;
