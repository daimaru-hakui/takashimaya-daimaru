"use client";
import { db } from '@/firebase/client';
import { Project } from '@/types';
import { Badge, Box, Divider, Flex, Paper, Select, Stack, Title } from '@mantine/core';
import { format } from 'date-fns';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { statusList } from '@/utils/status-list';
import DetailHeader from './detail-header';
import DetailTodo from './detail-todos';

interface Props {
  id: string;
}

const DtailArea: FC<Props> = ({ id }) => {
  const [project, setProject] = useState<Project>();

  const statusLabel = (status: string = "") => {
    switch (status) {
      case "NEGOTIATION":
        return "商談中";
      case "QUOTATION":
        return "見積中";
      default:
        return "";
    }
  };

  const OrderTypeLabel = (orderType: string = "") => {
    switch (orderType) {
      case "ORDER":
        return "別注";
      case "READY":
        return "既製";
      default:
        return "";
    }
  };

  useEffect(() => {
    const getProject = async () => {
      const docRef = doc(db, "projects", `${id}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
      onSnapshot(docRef, (snapshot) => {
        setProject({ ...snapshot.data(), id: snapshot.id } as Project);
      });
    };
    getProject();
  }, [id]);

  const HandleSelectChange = (e: string | null) => {
    const value = e;
    const docRef = doc(db, "projects", `${project?.id}`);
    updateDoc(docRef, {
      status: value
    });
  };

  if (!project) return;

  return (
    <Paper p="md" shadow='md' w="100%" maw={{ base: "100%", md: "400" }}>
      <DetailHeader project={project} />
      <Divider my="sm" />
      <Flex justify="space-between" align="center">
        <Box>
          {project?.createdAt && format(new Date(project?.createdAt.toDate()), "yyyy-MM-dd")}
        </Box>
        <Box>
          <Badge size='lg' color={project?.orderType === "ORDER" ? "green" : "blue"}>{OrderTypeLabel(project?.orderType)}</Badge>
        </Box>
      </Flex>
      <Title order={2}>{project?.title}</Title>
      <Stack gap="md" mt="md">
        <Flex w="100%">
          <Box w="50%">
            <Box c="gray" fz="sm">納期</Box>
            <Box>{project?.deadline}</Box>
          </Box>
          <Box w="50%">
            <Box c="gray" fz="sm">売上規模</Box>
            <Box>{project?.sales}万円</Box>
          </Box>
        </Flex>
        <Flex w="100%">
          <Box w="50%">
            <Box c="gray" fz="sm">担当者1</Box>
            <Box>{project?.staff1}</Box>
          </Box>
          <Box w="50%">
            <Box c="gray" fz="sm">担当者2</Box>
            <Box>{project?.staff2}</Box>
          </Box>
        </Flex>
        <Flex w="100%">
          <Box w="50%">
            <Box c="gray" fz="sm">ステータス</Box>
            <Box>
              <Select
                w={150}
                value={project.status}
                data={statusList}
                onChange={(e) => HandleSelectChange(e)}
              />
            </Box>
          </Box>
        </Flex>
      </Stack>
      <Divider my="sm" />
      <DetailTodo project={project} />
    </Paper >
  );
};

export default DtailArea;