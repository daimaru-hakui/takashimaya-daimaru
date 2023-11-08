"use client";
import { db } from '@/firebase/client';
import { Project } from '@/types';
import { Box, Button, Center, Flex, Input, Textarea } from '@mantine/core';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  id: string;
}

type Message = {
  id: string;
  content: string;
  cratedAt: any;
};

const ChatArea: FC<Props> = ({ id }) => {

  const [project, setProject] = useState<Project>();
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

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
      const q = query(coll, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Message
        )));
      });
    };
    getMessages();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };


  const createMessage = async () => {
    const coll = collection(db, "projects", `${id}`, "messages");
    await addDoc(coll, {
      content,
      createdAt: serverTimestamp()
    });
    setContent("");
  };

  return (
    <Flex h="100%" direction="column" align="center" >
      <div>{project?.title}</div>
      <Box>
        {messages.map((message) => (
          <Box key={message.id}>{message.content}</Box>
        ))}
      </Box>
      <Flex w="80%" gap={12} pos="fixed" bottom={50} justify="space-between">
        <Textarea w="100%" autosize={true} value={content} onChange={handleChange} />
        <Button
          onClick={createMessage}
        >
          投稿
        </Button>
      </Flex>
    </Flex>

  );
};

export default ChatArea;