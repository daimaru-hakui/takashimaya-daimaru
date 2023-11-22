"use client";
import { db } from "@/firebase/client";
import { Button, Flex, Textarea } from "@mantine/core";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Project } from "@/types";

interface Props {
  id: string;
  messageCount: number;
  project: Project | undefined;
}

type Inputs = {
  content: string;
};

const ChatInput: FC<Props> = ({ id, messageCount, project }) => {
  const session = useSession();
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const coll = collection(db, "users");
      const snapSHot = await getDocs(coll);
      const object: any = snapSHot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let array: string[] = [];
      object.forEach((doc: any) => {
        array.push(doc.email);
      });
      setEmails(array)
    };
    getUsers();
  }, []);

  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    sendEmail(data);
    createMessage(data);
    reset();
  };

  const createMessage = async (data: Inputs) => {
    const coll = collection(db, "projects", `${id}`, "messages");
    await addDoc(coll, {
      content: data.content,
      author: session.data?.user.uid,
      email: session.data?.user.email,
      createdAt: serverTimestamp(),
      deletedAt: null,
      read: [],
    });
    setContent("");
  };

  const sendEmail = async (data: Inputs) => {
    for (let email of emails) {
      const template_params = {
        user_email: email,
        title: project?.title,
        content: data.content,
        link: location.href,
      };
      await emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          template_params,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <Flex
      w="100%"
      maw={600}
      pos="absolute"
      bottom={messageCount > 0 ? 0 : ""}
      align="center"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Flex gap={12}>
          <Textarea
            w="100%"
            autosize={true}
            {...register("content", { required: true })}
          />
          <Button type="submit">投稿</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ChatInput;
