"use client";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./NumberInput.module.css";

type Inputs = {
  title: string;
  staff: string;
  deadline: string;
  sales: number;
  comment: string;
};

const ProjectForm = () => {
  // const [sales,setSales] =
  const { register } = useForm<Inputs>();
  const focusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  return (
    <form>
      <Flex p={24} w="100%" direction="column">
        <Title order={2}>案件登録</Title>
        <Stack gap={24} mt={24}>
          <TextInput label="案件名" {...register("title")} />
          <TextInput label="担当者名" {...register("staff")} />
          <Box>
            <Text fz="sm">売上規模</Text>
            <input
              type="number"
              className={`${classes.input}`}
              style={{ padding: "4px 5px", width: "100%" }}
              onFocus={focusHandler}
              {...register("sales")}
            />
          </Box>
          <TextInput type="date" label="納期" />
          <Textarea {...register("comment")}></Textarea>
          <Button fullWidth>登録</Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default ProjectForm;
