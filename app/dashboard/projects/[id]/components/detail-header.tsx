import { Project } from "@/types";
import { Box, Flex } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";
import { FcFolder } from "react-icons/fc";
import ProjectsEditModal from "../../components/projects-edit-modal";
import { useStore } from "@/store";

interface Props {
  project: Project;
}

const DetailHeader: FC<Props> = ({ project }) => {
  const currentUser = useStore((state) => state.currentUser);
  return (
    <Flex gap={12} align="center" justify="space-between">
      <Link href={`/dashboard`}>
        <Box fz="sm">一覧へ戻る</Box>
      </Link>
      <Flex gap="md">
        {currentUser?.isEditor && <ProjectsEditModal project={project} />}
        {project?.fileLink && (
          <a
            href={project?.fileLink ? project?.fileLink : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Flex align="center">
              <FcFolder style={{ cursor: "pointer", fontSize: 24 }} />
            </Flex>
          </a>
        )}
      </Flex>
    </Flex>
  );
};

export default DetailHeader;
