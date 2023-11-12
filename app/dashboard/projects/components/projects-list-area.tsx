import { Paper, Title } from "@mantine/core";
import React from "react";
import ProjectsTable from "./projects-table";

const ProjectListArea = () => {
  return (
    <Paper w="100%" maw={1300} p={24} mx="auto" radius="md" shadow="md">
      <Title order={2}>案件リスト</Title>
      <ProjectsTable />
    </Paper>
  );
};

export default ProjectListArea;
