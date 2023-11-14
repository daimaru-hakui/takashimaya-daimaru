import React, { FC } from "react";
import { Paper, Text, Group, Box, Flex } from "@mantine/core";
import classes from "./Stats.module.css";

interface Props {
  title: string;
  value: number;
  unit: string;
  icon: React.JSX.Element;
}

const Stats: FC<Props> = ({ title, value, unit, icon }) => {
  return (
    <Paper w="100%"  withBorder p="md" radius="md" shadow="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {title}
        </Text>
        <Box style={{ fontSize: 24, color: "gray" }}>{icon}</Box>
      </Group>

      <Group align="flex-end" gap="xs" mt={12}>
        <Flex align="flex-end" gap={5}>
          <Box className={classes.value}>{value.toLocaleString()}</Box>
          <Box className={classes.unit}>{unit}</Box>
        </Flex>
      </Group>
    </Paper>
  );
};

export default Stats;
