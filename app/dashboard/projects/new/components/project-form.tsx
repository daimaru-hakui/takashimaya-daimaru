"use client";
import {
  Box,
  Button,
  Flex,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./NumberInput.module.css";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { format } from "date-fns";

type Inputs = {
  id: string;
  title: string;
  staff1: string;
  staff2: string;
  deadline: string;
  sales: number;
  status: string;
  orderType: string;
  fileLink: string;
  comment: string;
};

interface Props {
  defaultValues: Inputs;
  pageType: "NEW" | "EDIT";
  close?: () => void;
}

const ProjectForm: FC<Props> = ({ defaultValues, pageType, close }) => {

  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: defaultValues
  });

  const focusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        await createProject(data);
        return;
      case "EDIT":
        await updateProject(data);
        close && close();
        return;
    }
  };

  const createProject = async (data: Inputs) => {
    const result = confirm("登録して宜しいでしょうか");
    if (!result) return;
    const docsRef = collection(db, "projects");
    try {
      await addDoc(docsRef, {
        title: data.title,
        sales: Number(data.sales),
        staff1: data.staff1 || "",
        staff2: data.staff2 || "",
        deadline: data.deadline || format(new Date(), "yyyy-MM-dd"),
        createdAt: serverTimestamp(),
        comment: data.comment || "",
        status: "NEGOTIATION",
        orderType: data.orderType,
        fileLink: data.fileLink || "",
        progress: 0
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProject = async (data: Inputs) => {
    const result = confirm("更新して宜しいでしょうか");
    if (!result) return;
    const docsRef = doc(db, "projects", `${data.id}`);
    try {
      await updateDoc(docsRef, {
        title: data.title,
        sales: Number(data.sales),
        staff1: data.staff1 || "",
        staff2: data.staff2 || "",
        deadline: data.deadline || format(new Date(), "yyyy-MM-dd"),
        updatedAt: serverTimestamp(),
        comment: data.comment || "",
        status: data.status,
        orderType: data.orderType,
        fileLink: data.fileLink,
        progress: 0
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex p={24} w="100%" direction="column">
        <Title order={2}>案件登録</Title>
        <Stack gap={24} mt={24}>
          <TextInput label="案件名" {...register("title", { required: true })} />
          <Flex gap={12}>
            <TextInput label="担当者名1" {...register("staff1")} />
            <TextInput label="担当者名2" {...register("staff2")} />
          </Flex>
          <Group>
            <Radio label="既製品" value="READY" {...register("orderType")} />
            <Radio label="別注品" value="ORDER" {...register("orderType")} />
          </Group>
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
          <TextInput
            type="date"
            defaultValue={defaultValues.deadline}
            label="納期"
            {...register("deadline")}
          />
          <TextInput label="ファイルリンク" {...register("fileLink")} />
          <Textarea {...register("comment")}></Textarea>
          <Button type="submit" fullWidth>{pageType === "NEW" ? "登録" : "更新"}</Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default ProjectForm;
