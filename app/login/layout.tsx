import { Box, Flex } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex justify="center" align="center" mih="100vh">
      {children}
    </Flex>
  );
};

export default LoginLayout;
