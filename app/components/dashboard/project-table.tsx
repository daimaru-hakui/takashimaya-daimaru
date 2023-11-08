"use client";
import { Table } from "@mantine/core";
import React from "react";
import ProjectTableRow from "./project-table-row";

const ProjectTable = () => {
  return (
    <Table mt={24}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>案件名</Table.Th>
          <Table.Th>担当者名</Table.Th>
          <Table.Th>売上規模</Table.Th>
          <Table.Th>納期</Table.Th>
          <Table.Th>進捗率</Table.Th>
          <Table.Th>ステータス</Table.Th>
          <Table.Th>詳細</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <ProjectTableRow />
      </Table.Tbody>
    </Table>
  );
};

export default ProjectTable;
