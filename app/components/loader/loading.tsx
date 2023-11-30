import React from "react";
import { Loader, Flex } from "@mantine/core";

const Loading = () => {
  return (
    <Flex w="100%" h="calc(100vh)" align="center" justify="center" pos="fixed" top={0}>
      <Loader color="blue" />
    </Flex>
  );
};

export default Loading;
