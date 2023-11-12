import { db } from '@/firebase/client';
import { Message } from '@/types';
import { Button, Flex, Textarea } from '@mantine/core';
import { addDoc, collection, getCountFromServer, query, serverTimestamp, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  id: string;
  messageCount: number;
}

type Inputs = {
  content: string;
};

const ChatInput: FC<Props> = ({ id, messageCount }) => {
  const session = useSession();

  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
      deletedAt: null
    });
    setContent("");
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
          <Textarea w="100%" autosize={true}
            {...register("content", { required: true })}
          />
          <Button type="submit">投稿</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ChatInput;