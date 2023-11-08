import { Paper, Title } from "@mantine/core";
import React from "react";
import ProjectTable from "./project-table";

const ProjectListArea = () => {
  return (
    <Paper w="100%" maw={800} p={24} mx="auto" radius="md" shadow="md">
      <Title order={2}>案件リスト</Title>
      <ProjectTable />
    </Paper>
  );
};

export default ProjectListArea;
