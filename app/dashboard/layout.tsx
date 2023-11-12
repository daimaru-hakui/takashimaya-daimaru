import { Box, Flex } from "@mantine/core";
import { PropsWithChildren } from "react";
import NabBar from "../components/nav-bar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Flex w="100%" mih="100vh" direction="column" bg="#f4f4f4">
      <NabBar />
      <Box w="100%" maw={1300} mx="auto" mih={"calc(100vh - 50px)"} p={36}>{children}</Box>
    </Flex>
  );
}
