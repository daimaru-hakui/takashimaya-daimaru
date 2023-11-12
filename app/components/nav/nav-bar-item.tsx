import { Box, Flex } from '@mantine/core';
import React, { FC } from 'react';
import { useHover } from "@mantine/hooks";

interface Props {
  title: string;
  icon: React.JSX.Element;
  onClick?: () => void;
}

const NavBarItem: FC<Props> = ({ title, icon, onClick }) => {
  const { hovered, ref } = useHover();
  return (
    <Flex
      ref={ref}
      fz="sm"
      gap={3}
      style={{ opacity: hovered ? 0.7 : 1, transition: "0.3s", cursor: "pointer" }}
      align="center"
      onClick={onClick}
    >
      {icon}
      <Box>{title}</Box>
    </Flex>
  );
};

export default NavBarItem;