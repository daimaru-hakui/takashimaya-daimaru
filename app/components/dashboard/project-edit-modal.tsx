import ProjectForm from '@/app/dashboard/projects/new/components/project-form';
import { Project } from '@/types';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC } from 'react';
import { AiOutlineEdit } from "react-icons/ai";

interface Props {
  project: Project;
}

const ProjectEditModal: FC<Props> = ({ project }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const defaultValues = {
    ...project
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="編集">
        <ProjectForm defaultValues={defaultValues} pageType="EDIT" close={close} />
      </Modal>
      <AiOutlineEdit
        style={{ cursor: "pointer", fontSize: 24 }}
        onClick={open}
      />
    </>);
};

export default ProjectEditModal;