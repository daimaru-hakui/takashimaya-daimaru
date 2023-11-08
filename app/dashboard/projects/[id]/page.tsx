import { NextPage } from 'next';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import ChatArea from './components/chat-area';

const ProjectId = ({ params }: { params: { id: string; }; }) => {
  const id = params.id;
  return (
    <ChatArea id={id} />
  );
};

export default ProjectId;