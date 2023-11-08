import {
  Paper,
} from "@mantine/core";
import React from "react";
import ProjectForm from "./components/project-form";

const ProjectNew = () => {
  return (
    <Paper shadow="md" radius="md" w={400} mx="auto">
      <ProjectForm />
    </Paper>
  );
};

export default ProjectNew;
