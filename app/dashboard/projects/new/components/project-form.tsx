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
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import classes from "./NumberInput.module.css";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { format } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

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
  todos: {
    title: string;
    isDone: boolean;
  }[];
  isCompleted: boolean;
  deletedAt: null;
};

interface Props {
  defaultValues: Inputs;
  pageType: "NEW" | "EDIT";
  close?: () => void;
}

const ProjectForm: FC<Props> = ({ defaultValues, pageType, close }) => {
  const router = useRouter();
  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "todos",
  });

  const addTodo = () => {
    append({
      title: "",
      isDone: false
    });
  };

  const removeTodo = (idx: number) => {
    remove(idx);
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        console.log(data);
        await createProject(data);
        router.push("/dashboard");
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
        deadline: data.deadline || "未定",
        comment: data.comment || "",
        status: "NEGOTIATION",
        orderType: data.orderType,
        fileLink: data.fileLink || "",
        todos: data.todos || [],
        isCompleted: false,
        createdAt: serverTimestamp(),
        deletedAt: null
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
        deadline: data.deadline || "未定",
        comment: data.comment || "",
        status: data.status,
        orderType: data.orderType,
        fileLink: data.fileLink,
        todos: data.todos || [],
        // todos: [
        //   {title:"商談",isDone:false},
        //   {title:"デザイン作成",isDone:false},
        //   {title:"提案書作成",isDone:false},
        //   {title:"サンプル作成",isDone:false},
        //   {title:"生産中",isDone:false},
        //   {title:"着用テスト中",isDone:false},
        //   {title:"採寸中",isDone:false},
        //   {title:"結果連絡待ち",isDone:false},
        // ],
        isCompleted: data.isCompleted,
        deletedAt: data.deletedAt,
        updatedAt: serverTimestamp(),
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
          <TextInput label="案件名" required {...register("title", { required: true })} />
          <Flex gap={12}>
            <TextInput label="担当者名1" {...register("staff1")} />
            <TextInput label="担当者名2" {...register("staff2")} />
          </Flex>
          <Group >
            <Radio label="既製品"
              defaultValue={defaultValues.orderType}
              value="READY"
              {...register("orderType")}
            />
            <Radio
              label="別注品"
              value="ORDER"
              {...register("orderType")}
            />
          </Group>
          <Box>
            <Text fz="sm">売上規模（万円）</Text>
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
          <TextInput label="共有フォルダーリンク" placeholder="/path" {...register("fileLink")} />
          <Stack gap={6}>
            <Box fz="sm">進捗リスト項目</Box>
            {fields.map((field, idx) => (
              <Flex key={field.id} align="center" justify="space-between" gap={12}>
                <TextInput
                  w="100%"
                  {...register(`todos.${idx}.title`, { required: true })} required
                />
                <AiOutlineDelete
                  style={{ cursor: "pointer", fontSize: 20 }}
                  onClick={() => removeTodo(idx)}
                />
              </Flex>
            ))}
            <Button
              variant="outline"
              p={3} w="50px"
              onClick={addTodo}
            >
              <MdOutlineAddCircle
                style={{ cursor: "pointer", fontSize: 20 }}
              />
            </Button>
          </Stack>
          {/* <Textarea {...register("comment")}></Textarea> */}
          <Button type="submit" fullWidth>
            {pageType === "NEW" ? "登録" : "更新"}
          </Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default ProjectForm;
