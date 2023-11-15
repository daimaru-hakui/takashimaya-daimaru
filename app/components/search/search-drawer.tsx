import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { IoFilter } from "react-icons/io5";
import {
  Drawer,
  Stack,
  Button,
  Text,
  TextInput,
  Box,
  Select,
} from "@mantine/core";
import SearchTitleInput from "./search-title-input";
import { statusList } from "@/utils/status-list";
import { useStore } from "@/store";

const SearchDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const setSearchText = useStore((state) => state.setSearchText);
  const searchStaff = useStore((state) => state.searchStaff);
  const setSearchStaff = useStore((state) => state.setSearchStaff);
  const startAt = useStore((state) => state.startAt);
  const setStartAt = useStore((state) => state.setStartAt);
  const endAt = useStore((state) => state.endAt);
  const setEndAt = useStore((state) => state.setEndAt);
  const searchStatus = useStore((state) => state.searchStatus);
  const setSearchStatus = useStore((state) => state.setSearchStatus);
  const resetSearch = useStore((state) => state.resetSearch);

  const reset = () => {
    resetSearch()
  };

  return (
    <>
      <Drawer
        opened={opened}
        size="xs"
        position="right"
        onClose={close}
        title="検索"
      >
        <Stack gap={16}>
          <Box>
            <Text fz="sm">案件名</Text>
            <SearchTitleInput />
          </Box>
          <TextInput
            mt={6}
            label="担当"
            value={searchStaff}
            onChange={(e) => setSearchStaff(e.target.value)}
          />
          <TextInput
            mt={6}
            label="納期開始"
            type="date"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
          <TextInput
            mt={6}
            label="納期終了"
            type="date"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
          />
          <Select
            label="ステータス"
            w="100%"
            data={statusList}
            value={searchStatus}
            onChange={(e) => setSearchStatus(e || "")}
          />
          <Button onClick={reset}>フィルター解除</Button>
        </Stack>
      </Drawer>

      <Button onClick={open}>
        <IoFilter style={{ cursor: "pointer" }} />
      </Button>
    </>
  );
};

export default SearchDrawer;
