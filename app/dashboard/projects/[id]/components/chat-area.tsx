"use client";
import { db } from '@/firebase/client';
import { Message } from '@/types';
import { Flex, } from '@mantine/core';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import ChatMessage from './chat-message';
import ChatInput from './chat-Input';

interface Props {
  id: string;
}

const ChatArea: FC<Props> = ({ id }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const coll = collection(db, "projects", `${id}`, "messages");
      const q = query(coll, where("deletedAt", "==", null), orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Message
        )));
      });
    };
    getMessages();
  }, [id]);

  return (
    <Flex
      w="100%"
      maw={{ base: "100%", md: 600 }}
      mih="calc(100vh - 130px)"
      direction="column"
      align="center"
      pos="relative">
      <Flex
        direction="column-reverse"
        w="100%"
        mb={50}
        style={{ overflow: "auto", maxHeight: "calc(100vh - 180px)" }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} id={id} />
        ))}
      </Flex>
      <ChatInput id={id} messageCount={messages?.length} />
    </Flex>
  );
};

export default ChatArea;