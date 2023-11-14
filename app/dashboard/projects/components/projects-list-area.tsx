"use client"
import { Button, Flex, Paper, Title } from "@mantine/core";
import React from "react";
import ProjectsTable from "./projects-table";
import Link from "next/link";
import { useStore } from "@/store";

const ProjectListArea = () => {
  const currentUser = useStore((state) => state.currentUser);
  return (
    <Paper w="100%" maw={1300} p="lg" mt="md" mx="auto" radius="md" shadow="md">
      <Flex justify="space-between">
        <Title order={2}>案件リスト</Title>
        {currentUser?.isEditor && (
          <Link href="/dashboard/projects/new">
            <Button>案件登録</Button>
          </Link>
        )}
      </Flex>
      <ProjectsTable />
    </Paper>
  );
};

export default ProjectListArea;
