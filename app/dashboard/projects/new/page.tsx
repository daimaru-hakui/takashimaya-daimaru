import {
  Paper,
} from "@mantine/core";
import React from "react";
import ProjectForm from "./components/project-form";
import { format } from "date-fns";

const ProjectNew = () => {
  const defaultValues = {
    id: "",
    title: "",
    staff: "",
    deadline: format(new Date(), "yyyy-MM-dd"),
    sales: 0,
    status: "NEGOTIATION",
    comment: ""
  };
  return (
    <Paper shadow="md" radius="md" w={400} mx="auto">
      <ProjectForm defaultValues={defaultValues} pageType="NEW" />
    </Paper>
  );
};

export default ProjectNew;
