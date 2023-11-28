"use client";
import { Project } from "@/types";
import { Badge, Box, Flex, Progress, Select, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useState } from "react";
import ProjectsEditModal from "./projects-edit-modal";
import {
  AiOutlineExclamationCircle,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";
import { statusList } from "@/utils/status-list";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { FcFolder } from "react-icons/fc";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

const ProjectTableRow: FC<Props> = ({ project }) => {
  const [progressRate, setProgressRate] = useState(0);
  const currentUser = useStore((state) => state.currentUser);
  const [status, setStatus] = useState("");
  const router = useRouter()

  const getOrderTypeLabel = (orderType: string) => {
    switch (orderType) {
      case "ORDER":
        return "別注";
      case "READY":
        return "既製";
      default:
        return "";
    }
  };

  const getStatus = (statusId: string) => {
    const findStatus = statusList.find((status) => status.value === statusId);
    if (!findStatus) return;
    setStatus(findStatus.label);
  };

  useEffect(() => {
    getStatus(project.status);
  }, [project.status]);

  const HandleSelectChange = (e: string | null) => {
    const value = e;
    const docRef = doc(db, "projects", `${project.id}`);
    updateDoc(docRef, {
      status: value,
    });
  };

  const finishedProject = (id: string) => {
    const result = confirm("案件を完了して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "projects", `${id}`);
    try {
      updateDoc(docRef, {
        isCompleted: true,
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
        deletedAt: serverTimestamp(),
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
        isCompleted: false,
      });
      router.push("/dashboard")
    } catch (error) {
      console.error(error);
    }
  };

  const calcProgressRate = useCallback(() => {
    if (!project) return;
    const total = project.todos?.length || 0;
    const filterTodos = project.todos?.filter((todo) => todo.isDone === true);
    const rate = Math.round((filterTodos?.length / total) * 100);
    setProgressRate(rate || 0);
  }, [project]);

  useEffect(() => {
    calcProgressRate();
  }, [calcProgressRate]);

  return (
    <Table.Tr>
      <Table.Td w={100}>
        {project.createdAt}
      </Table.Td>
      <Table.Td>{project.title}</Table.Td>
      <Table.Td>{project.staff1}{project.staff1 && "様"}</Table.Td>
      <Table.Td>{project.staff2}{project.staff2 && "様"}</Table.Td>
      <Table.Td>
        <Badge
          size="lg"
          color={project?.orderType === "ORDER" ? "teal" : "blue"}
        >
          {getOrderTypeLabel(project.orderType)}
        </Badge>
      </Table.Td>
      <Table.Td style={{textAlign:"right"}} pr={30}>{project.sales.toLocaleString()}万</Table.Td>
      <Table.Td>{project.deadline}</Table.Td>
      <Table.Td>
        <Text fz="xs">{progressRate}%</Text>
        <Box>
          <Progress value={progressRate} mt={3} />
        </Box>
      </Table.Td>
      <Table.Td>
        {currentUser?.isEditor ? (
          <Select
            w={150}
            value={project.status}
            data={statusList}
            onChange={(e) => HandleSelectChange(e)}
          />
        ) : (
          status
        )}
      </Table.Td>
      <Table.Td>
        <Flex justify="flex-start" align="center" gap={12}>
          <Link href={`/dashboard/projects/${project.id}`}>
            <Flex align="center">
              <AiOutlineExclamationCircle
                style={{ cursor: "pointer", fontSize: 24 }}
              />
            </Flex>
          </Link>
          {project.isCompleted === false ? (
            <>
              {currentUser?.isEditor && (
                <>
                  <ProjectsEditModal project={project} />
                  <AiOutlineCheckCircle
                    style={{ cursor: "pointer", fontSize: 24 }}
                    onClick={() => finishedProject(project.id)}
                  />
                </>
              )}
            </>
          ) : (
            currentUser?.isEditor && (
              <BsArrowReturnLeft
                style={{ cursor: "pointer", fontSize: 20 }}
                onClick={() => returnProject(project.id)}
              />
            )
          )}
          {currentUser?.isEditor && (
            <AiOutlineDelete
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() => removeProject(project.id)}
            />
          )}
          {project.fileLink && (
            <a
              href={project?.fileLink ? project?.fileLink : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Flex align="center">
                <FcFolder style={{ cursor: "pointer", fontSize: 24 }} />
              </Flex>
            </a>
          )}
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};

export default ProjectTableRow;
