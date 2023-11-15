"use client";
import { Button, Flex, Paper } from "@mantine/core";
import React from "react";
import SearchDrawer from "./search-drawer";
import SearchTitleInput from "./search-title-input";
import { useStore } from "@/store";

const SearchArea = () => {
  const projects = useStore((state) => state.projects);
  const filterProjects = useStore((state) => state.filterProjects);
  const resetSearch = useStore((state) => state.resetSearch);
  const reset = () => {
    resetSearch()
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
