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
    deadline: "未定",
    sales: 0,
    status: "NEGOTIATION",
    orderType: "READY",
    fileLink: "",
    comment: "",
    todos: [
        {title:"商談",isDone:false},
        {title:"デザイン作成",isDone:false},
        {title:"提案書作成",isDone:false},
        {title:"見積中",isDone:false},
        {title:"サンプル作成",isDone:false},
        {title:"サンプル提案中",isDone:false},
        {title:"生産中",isDone:false},
        {title:"着用テスト中",isDone:false},
        {title:"採寸中",isDone:false},
        {title:"結果連絡待ち",isDone:false},
      ],
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
