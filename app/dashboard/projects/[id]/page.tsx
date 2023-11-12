import { NextPage } from 'next';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import ChatArea from './components/chat-area';
import DtailArea from './components/detail-area';
import { Flex } from '@mantine/core';

const ProjectId = ({ params }: { params: { id: string; }; }) => {
  const id = params.id;
  return (
    <Flex w="100%" justify="center" gap={24} direction={{ base: "column", md: "row" }} >
      <DtailArea id={id} />
      <ChatArea id={id} />
    </Flex>
  );
};

export default ProjectId;