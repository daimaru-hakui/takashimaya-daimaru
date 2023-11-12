"use client";
import { Project } from "@/types";
import { Box, Flex, Group, Progress, Select, Table, Text, Tooltip } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useState } from "react";
import ProjectsEditModal from "./projects-edit-modal";
import { AiOutlineExclamationCircle, AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";
import { statusList } from "@/utils/status-list";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { FcFolder } from "react-icons/fc";

interface Props {
  project: Project;
}

const ProjectTableRow: FC<Props> = ({ project }) => {
  const [progressRate, setProgressRate] = useState(0);

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

  const HandleSelectChange = (e: string | null) => {
    const value = e;
    const docRef = doc(db, "projects", `${project.id}`);
    updateDoc(docRef, {
      status: value
    });
  };

  const finishedProject = (id: string) => {
    const result = confirm("案件を完了して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "projects", `${id}`);
    try {
      updateDoc(docRef, {
        isCompleted: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeProject = (id: string) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "projects", `${id}`);
    try {
      updateDoc(docRef, {
        deletedAt: serverTimestamp()
      });
    } catch (error) {
      console.error(error);
    }
  };

  const returnProject = (id: string) => {
    const result = confirm("案件リストへ戻して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "projects", `${id}`);
    try {
      updateDoc(docRef, {
        isCompleted: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  const calcProgressRate = useCallback(() => {
    if (!project) return;
    const total = project.todos?.length || 0;
    const filterTodos = project.todos?.filter((todo) => (
      todo.isDone === true
    ));
    const rate = Math.round(filterTodos?.length / total * 100);
    setProgressRate(rate || 0);
  }, [project]);

  useEffect(() => {
    calcProgressRate();
  }, [calcProgressRate]);

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
      <Table.Td>
        <Text fz="xs">
          {progressRate}%
        </Text>
        <Box>
          <Progress value={progressRate} mt={3} />
        </Box>
      </Table.Td>
      <Table.Td>
        <Select
          w={150}
          value={project.status}
          data={statusList}
          onChange={(e) => HandleSelectChange(e)}
        />
      </Table.Td>
      {/* <Table.Td>{project.comment}</Table.Td> */}
      <Table.Td >
        <Flex justify="flex-start" align="center" gap={12}>
          <Link href={`/dashboard/projects/${project.id}`}>
            <Flex align="center">
              <AiOutlineExclamationCircle style={{ cursor: "pointer", fontSize: 24 }} />
            </Flex>
          </Link>
          {project.isCompleted === false ? (
            <>
              <ProjectsEditModal project={project} />
              <AiOutlineCheckCircle
                style={{ cursor: "pointer", fontSize: 24 }}
                onClick={() => finishedProject(project.id)}
              />
            </>
          ) : (
            <>
              <BsArrowReturnLeft
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => returnProject(project.id)}
              />
            </>
          )}
          <AiOutlineDelete
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => removeProject(project.id)}
          />
          {project.fileLink && (
            <a href={project?.fileLink ? project?.fileLink : "#"} target="_blank" rel="noopener noreferrer">
              <Flex align="center">
                <FcFolder style={{ cursor: "pointer", fontSize: 24 }} />
              </Flex>
            </a>
          )}
        </Flex>
      </Table.Td>
    </Table.Tr >
  );
};

export default ProjectTableRow;
