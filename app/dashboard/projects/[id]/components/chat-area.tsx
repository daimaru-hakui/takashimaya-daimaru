"use client";
import { db } from '@/firebase/client';
import { Message, Project } from '@/types';
import { Box, Flex, } from '@mantine/core';
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { FC, useEffect, useRef, useState } from 'react';
import ChatMessage from './chat-message';
import ChatInput from './chat-Input';
import Link from 'next/link';
import { AiOutlineFolder } from "react-icons/ai";

interface Props {
  id: string;
}

const ChatArea: FC<Props> = ({ id }) => {
  const [project, setProject] = useState<Project>();
  const [messages, setMessages] = useState<Message[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getProject = async () => {
      const docRef = doc(db, "projects", `${id}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
      setProject({ ...docSnap.data(), id: docSnap.id } as Project);
    };
    getProject();
  }, [id]);

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
    <Flex h="100%" direction="column" align="center" >
      <Flex gap={12}>
        <Box>{project?.title}</Box>
        {project?.fileLink && (
          <Link href={project?.fileLink ? project?.fileLink : "#"}>
            <Flex align="center">
              <AiOutlineFolder style={{ cursor: "pointer", fontSize: 24 }} />
            </Flex>
          </Link>
        )}
      </Flex>
      <Flex
        direction="column-reverse"
        w="100%"
        maw={600}
        style={{ overflow: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} id={id} />
        ))}
      </Flex>
      <ChatInput id={id}
      />
    </Flex>
  );
};

export default ChatArea;