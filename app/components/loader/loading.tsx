import React from "react";
import { Loader, Flex } from "@mantine/core";

const Loading = () => {
  return (
    <Flex w="100%" h="calc(100vh - 200px)" align="center" justify="center">
      <Loader color="blue" />
    </Flex>
  );
};

export default Loading;
