import React, { FC, useState } from 'react';
import { Button, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AiOutlineEdit } from "react-icons/ai";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { Message } from '@/types';
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  id: string;
  message: Message;
}

type Inputs = {
  content: string;
};


const ChatEdit: FC<Props> = ({ id, message }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      content: message.content
    }
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateMessage(id, message.id, data);
    close();
  };

  const updateMessage = (id: string, postId: string, data: Inputs) => {
    const result = confirm("更新して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "projects", `${id}`, "messages", `${postId}`);
    updateDoc(docRef, {
      content: data.content
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="編集">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea autosize={true} {...register("content")} />
          <Button
            type="submit"
            mt={24}
            fullWidth
          >
            更新
          </Button>
        </form >
      </Modal>
      <AiOutlineEdit style={{ cursor: "pointer" }} onClick={open} />
    </>
  );
};

export default ChatEdit;