import { Project } from "@/types";
import { Button, Flex, Table } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ProjectEditModal from "./project-edit-modal";

interface Props {
  project: Project;
}

const ProjectTableRow: FC<Props> = ({ project }) => {

  const statusLabel = (status: string) => {
    switch (status) {
      case "NEGOTIATION":
        return "商談中";
      case "QUOTATION":
        return "見積中";
      default:
        return "";
    }
  };

  return (
    <Table.Tr >
      <Table.Td>{project.createdAt &&
        format(new Date(project?.createdAt.toDate()), "yyyy-MM-dd")}
      </Table.Td>
      <Table.Td>{project.title}</Table.Td>
      <Table.Td>{project.staff}</Table.Td>
      <Table.Td>{project.sales}万円</Table.Td>
      <Table.Td>{project.deadline}</Table.Td>
      <Table.Td>{(project.progress)}%</Table.Td>
      <Table.Td>{statusLabel(project.status)}</Table.Td>
      <Table.Td>
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button>コメント</Button>
        </Link>
      </Table.Td>
      {/* <Table.Td>{project.comment}</Table.Td> */}
      <Table.Td >
        <Flex justify="center" align="center">
          <ProjectEditModal project={project} />
        </Flex>
      </Table.Td>
    </Table.Tr >
  );
};

export default ProjectTableRow;
