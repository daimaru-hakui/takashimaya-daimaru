"use client";
import { Button, Flex, Paper } from "@mantine/core";
import React, { FC } from "react";
import SearchDrawer from "./search-drawer";
import SearchTitleInput from "./search-title-input";
import { Project } from "@/types";

interface Props {
  projects: Project[];
  filterProjects: Project[];
  resetSearch: () => void;
}

const SearchArea: FC<Props> = ({ projects, filterProjects, resetSearch }) => {
  const reset = () => {
    resetSearch();
  };
  return (
    <Flex mb="lg" justify="space-between" gap="lg">
      <Paper radius="md" shadow="xs" w="100%" maw={500}>
        <SearchTitleInput />
      </Paper>
      <Flex gap="lg">
        {projects.length !== filterProjects.length && (
          <Button onClick={reset}>フィルター解除</Button>
        )}
        <SearchDrawer />
      </Flex>
    </Flex>
  );
};
export default SearchArea;
