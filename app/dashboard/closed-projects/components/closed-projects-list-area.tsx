import { Paper, Title } from "@mantine/core";
import React from "react";
import ClosedProjectTable from "./closed-projects-table";

const ClosedProjectListArea = () => {
  return (
    <Paper w="100%" maw={1300} p={24} mx="auto" radius="md" shadow="md">
      <Title order={2}>終了案件リスト</Title>
      <ClosedProjectTable />
    </Paper>
  );
};

export default ClosedProjectListArea;
