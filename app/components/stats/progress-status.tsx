import React, { FC } from "react";
import { Progress, Tooltip, Paper, Group, Text, Box } from "@mantine/core";
import { ImStatsBars2 } from "react-icons/im";
import classes from "./Stats.module.css";
import { Project } from "@/types";

interface Props {
  filterProjects: Project[];
}

const ProgressStatus: FC<Props> = ({ filterProjects }) => {
  let PROGRESS = 0;
  let PENDING = 0;
  let DECIDED = 0;
  let CLAIM = 0;
  filterProjects.forEach((project) => {
    if (project.status === "PROGRESS") {
      PROGRESS += 1;
    } else if (project.status === "PENDING") {
      PENDING += 1;
    } else if (project.status === "DECIDED") {
      DECIDED += 1;
    } else if (project.status === "CLAIM") {
      CLAIM += 1;
    }
  });

  return (
    <Paper w="100%"  withBorder p="md" radius="md" shadow="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          ステータス
        </Text>
        <Box style={{ fontSize: 24, color: "gray" }}>
          <ImStatsBars2 />
        </Box>
      </Group>
      <Box mt={12}>
        <Progress.Root size={50}>
          <Tooltip label={`進行中 ${PROGRESS}`}>
            <Progress.Section
              value={(PROGRESS / filterProjects.length) * 100}
              color="cyan"
            >
              <Progress.Label fz={12}>進行中</Progress.Label>
            </Progress.Section>
          </Tooltip>

          <Tooltip label={`保留 ${PENDING}`}>
            <Progress.Section
              value={(PENDING / filterProjects.length) * 100}
              color="pink"
            >
              <Progress.Label fz={12}>保留</Progress.Label>
            </Progress.Section>
          </Tooltip>

          <Tooltip label={`決定 ${DECIDED}`}>
            <Progress.Section
              value={(DECIDED / filterProjects.length) * 100}
              color="orange"
            >
              <Progress.Label fz={12}>決定</Progress.Label>
            </Progress.Section>
          </Tooltip>
          <Tooltip label={`クレーム ${CLAIM}`}>
            <Progress.Section
              value={(CLAIM / filterProjects.length) * 100}
              color="grape"
            >
              <Progress.Label fz={12}>クレーム</Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root>
      </Box>
    </Paper>
  );
};

export default ProgressStatus;
