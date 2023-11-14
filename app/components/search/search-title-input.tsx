import React from "react";
import { useStore } from "@/store";
import { CloseButton, Input } from "@mantine/core";
import { BiSearch } from "react-icons/bi";

const SearchTitleInput = () => {
  const searchText = useStore((state) => state.searchText);
  const setSearchText = useStore((state) => state.setSearchText);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <Input
      w="100%"
      radius="md"
      placeholder="Search"
      value={searchText}
      leftSection={<BiSearch size={16} />}
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={() => setSearchText("")}
          style={{ display: searchText ? undefined : "none" }}
        />
      }
      rightSectionPointerEvents="all"
      onChange={handleChange}
    />
  );
};

export default SearchTitleInput;
