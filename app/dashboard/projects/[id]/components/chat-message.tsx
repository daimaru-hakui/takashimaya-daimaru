'use client';
import { Box, Flex, Paper } from '@mantine/core';
import React, { FC } from 'react';
import { useSession } from 'next-auth/react';
import { Message } from '@/types';
import { format } from 'date-fns';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import ChatEdit from './chat-edit';

interface Props {
  message: Message;
  id: string;
}

const ChatMessage: FC<Props> = ({ message, id }) => {
  const session = useSession();
  const result = message.author === session.data?.user.uid;

  const deleteMessage = (id: string, postId: string) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    const docRef = doc(db, "projects", `${id}`, "messages", `${postId}`);
    updateDoc(docRef, {
      deletedAt: serverTimestamp()
    });
  };

  return (
    <Box
      w="95%"
      mb={24}
    >
      <Flex align="center" justify="space-between" gap={12}>
        <Flex align="center" gap={12}>
          <Box>{message.email}</Box>
          <Box fz="xs">
            {message.createdAt && format(new Date(message.createdAt?.toDate()),
              "yyyy-MM-dd  HH:mm")}
          </Box>
        </Flex>

        {result && (
          <Flex align="center" gap={12}>
            <ChatEdit id={id} message={message} />
            <AiOutlineDelete style={{ cursor: "pointer" }}
              onClick={() => deleteMessage(id, message.id)}
            />
          </Flex>
        )}
      </Flex>

      <Paper
        px={12}
        py={6}
        radius="md"
      // bg={result ? "#08d85f" : "white"}
      >
        <Box style={{ whiteSpace: "pre-wrap" }} >
          {message.content}
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatMessage;