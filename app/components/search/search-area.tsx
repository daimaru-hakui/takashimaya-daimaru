"use client";
import {Flex,  Paper } from "@mantine/core";
import React from "react";
import SearchDrawer from "./search-drawer";
import SearchTitleInput from "./search-title-input";

const SearchArea = () => {


  return (
    <Flex mb="lg" justify="space-between">
      <Paper radius="md" shadow="xs" w="100%" maw={500}>
        <SearchTitleInput/>
      </Paper>
      <SearchDrawer />
    </Flex>
  );
};
export default SearchArea;
