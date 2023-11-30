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
import React, { FC, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "../../../components/NumberInput.module.css";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

type Inputs = {
  id: string;
  title: string;
  numberOfPeople: number;
  quantityPerPerson: number;
  responseDeadline: string;
  deadline: string;
  orderType: "READY" | "ORDER";
  inquiryType: "ESTIMATE" | "PROPOSAL";
  content: string;
  deletedAt: null;
};

const ContactForm: FC = () => {
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const router = useRouter();
  const setIsLoading = useStore((state) => state.setIsLoading);
  const [fileUpload, setFileUpload] = useState<File[] | undefined | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      numberOfPeople: 0,
      quantityPerPerson: 0,
      orderType: "READY",
      inquiryType: "ESTIMATE",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const docId = await addContact(data);
    if (!docId) return;
    await addImage(docId);
    router.push("/dashboard/contacts");
  };

  const addContact = async (data: Inputs) => {
    const result = confirm("送信して宜しいでしょうか");
    if (!result) return;
    setIsLoading(true);
    const coll = collection(db, "contacts");
    const userRef = doc(db, "users", `${currentUser}`);
    try {
      const newDoc = await addDoc(coll, {
        title: data.title,
        numberOfPeople: data.numberOfPeople,
        quantityPerPerson: data.quantityPerPerson,
        responseDeadline: data.responseDeadline || "未設定",
        deadline: data.deadline || "未設定",
        orderType: data.orderType,
        inquiryType: data.inquiryType,
        content: data.content,
        deletedAt: null,
        createdAt: serverTimestamp(),
        createdBy: {
          ref: userRef,
        },
        images:[]
      });
      return newDoc.id;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addImage = async (id: string) => {
    if (fileUpload?.length === 0 || !fileUpload) return;
    for (let file of fileUpload) {
      const fileName = file.name;
      const storageRef = ref(storage, `images/contacts/${id}/${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const docRef = doc(db, "contacts", id);
      updateDoc(docRef, {
        images: arrayUnion({
          url: url,
          path: storageRef.fullPath,
          type: file.type,
          name: file.name,
        }),
      });
    }
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setFileUpload([...files]);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const previewDelete = (idx: number) => {
    const newFiles = fileUpload?.filter((_, index) => index !== idx);
    setFileUpload(newFiles);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex p="lg" w="100%" direction="column">
        <Flex align="center" justify="space-between">
          <Title order={2}>案件依頼</Title>
          <Link href="/dashboard/contacts">
            <Button variant="outline" size="xs">
              一覧へ
            </Button>
          </Link>
        </Flex>
        <Stack gap={24} mt={24}>
          <TextInput
            label="案件名"
            required
            {...register("title", { required: true })}
          />
          <Group>
            <Radio label="既製品" value="READY" {...register("orderType")} />
            <Radio label="別注品" value="ORDER" {...register("orderType")} />
          </Group>
          <Flex gap="md">
            <Box>
              <Text fz="sm">対象人数（人）</Text>
              <input
                type="number"
                className={`${classes.input}`}
                style={{ padding: "4px 5px", width: "100%" }}
                onFocus={focusHandler}
                {...register("numberOfPeople")}
              />
            </Box>
            <Box>
              <Text fz="sm">1人あたりの支給枚数(数)</Text>
              <input
                type="number"
                className={`${classes.input}`}
                style={{ padding: "4px 5px", width: "100%" }}
                onFocus={focusHandler}
                {...register("quantityPerPerson")}
              />
            </Box>
          </Flex>
          <Flex gap="md">
            <TextInput
              w="100%"
              type="date"
              label="納期"
              {...register("deadline")}
            />
            <TextInput
              w="100%"
              type="date"
              label="回答期日"
              {...register("responseDeadline")}
            />
          </Flex>
          <Group>
            <Radio
              label="御見積"
              value="ESTIMATE"
              {...register("inquiryType")}
            />
            <Radio
              label="提案書"
              value="PROPOSAL"
              {...register("inquiryType")}
            />
          </Group>
          <Textarea
            label="内容"
            {...register("content")}
            autosize
            minRows={5}
          ></Textarea>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button mx="auto" color="gray" w="150px" onClick={handleClick}>
            画像を選択
          </Button>
          <Box>
            {fileUpload &&
              fileUpload.length >= 1 &&
              fileUpload.map((file, idx) => (
                <Box key={file.name} pos="relative" mt="sm" mb="md">
                  {file.type === "application/pdf" ? (
                    <Box>{file.name}</Box>
                  ) : (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={300}
                      height={300}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}

                  <IoCloseCircle
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      cursor: "pointer",
                      fontSize: 30,
                      backgroundColor: "white",
                      borderRadius: "50%",
                    }}
                    onClick={() => previewDelete(idx)}
                  />
                </Box>
              ))}
          </Box>
          <Button type="submit" fullWidth>
            送信する
          </Button>
        </Stack>
      </Flex>
    </form>
  );
};

export default ContactForm;
