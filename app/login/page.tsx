import React from "react";
import LoginForm from "./components/login-form";
import { Box } from "@mantine/core";

const LoginPage = () => {
  return (
    <Box w="100%" maw="350px">
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
