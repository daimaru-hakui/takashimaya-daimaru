import { Project } from "@/types";
import { Button, Flex, Table } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import React, { FC } from "react";
import ProjectEditModal from "./project-edit-modal";
import { AiOutlineFolder } from "react-icons/ai";

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

  const OrderTypeLabel = (orderType: string) => {
    switch (orderType) {
      case "ORDER":
        return "別注";
      case "READY":
        return "既製品";
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
      <Table.Td>{project.staff1}</Table.Td>
      <Table.Td>{project.staff2}</Table.Td>
      <Table.Td>{OrderTypeLabel(project.orderType)}</Table.Td>
      <Table.Td>{project.sales}万円</Table.Td>
      <Table.Td>{project.deadline}</Table.Td>
      <Table.Td>{(project.progress)}%</Table.Td>
      <Table.Td>{statusLabel(project.status)}</Table.Td>
      <Table.Td>
        <Link href={`/dashboard/projects/${project.id}`}>
          <Button>メモ</Button>
        </Link>
      </Table.Td>
      {/* <Table.Td>{project.comment}</Table.Td> */}
      <Table.Td >
        <Flex justify="center" align="center" gap={12}>
          {project.fileLink && (
            <Link href={project?.fileLink ? project?.fileLink : "#"}>
              <Flex align="center">
                <AiOutlineFolder style={{ cursor: "pointer", fontSize: 24 }} />
              </Flex>
            </Link>
          )}
          <ProjectEditModal project={project} />
        </Flex>
      </Table.Td>
    </Table.Tr >
  );
};

export default ProjectTableRow;
