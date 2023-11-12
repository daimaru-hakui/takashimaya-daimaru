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
    staff1: "",
    staff2: "",
    deadline: format(new Date(), "yyyy-MM-dd"),
    sales: 0,
    status: "NEGOTIATION",
    orderType: "READY",
    fileLink: "",
    comment: "",
    todos: [],
    isCompleted: false,
    deletedAt: null
  };
  return (
    <Paper shadow="md" radius="md" w={400} mx="auto">
      <ProjectForm defaultValues={defaultValues} pageType="NEW" />
    </Paper>
  );
};

export default ProjectNew;
