"use client";
import { useStore } from '@/store';
import { CloseButton, Flex, Input, Paper } from '@mantine/core';
import React from 'react';
import { BiSearch } from "react-icons/bi";

const SearchArea = () => {
  const searchText = useStore((state) => state.searchText);
  const setSearchText = useStore((state) => state.setSearchText);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <Paper radius="md" shadow='xs' maw={500}>
      <Flex mb="lg">
        <Input
          w="100%"
          radius="md"
          placeholder="Search"
          value={searchText}
          leftSection={<BiSearch size={16} />}
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setSearchText('')}
              style={{ display: searchText ? undefined : 'none' }}
            />
          }
          rightSectionPointerEvents="all"
          onChange={handleChange}
        />
      </Flex>
    </Paper>
  );
};
export default SearchArea;