import { Button, Flex, Paper, Title } from "@mantine/core";
import React from "react";
import ProjectsTable from "./projects-table";
import Link from "next/link";

const ProjectListArea = () => {
  return (
    <Paper w="100%" maw={1300} p="lg" mx="auto" radius="md" shadow="md">
      <Flex justify="space-between">
        <Title order={2}>案件リスト</Title>
        <Link href="/dashboard/projects/new">
          <Button>案件登録</Button>
        </Link>
      </Flex>
      <ProjectsTable />
    </Paper>
  );
};

export default ProjectListArea;
