import { Box, Switch } from '@mantine/core';
import React, { FC } from 'react';

interface Props {
  todo: {
    title: string,
    isDone: boolean;
  };
  idx: number;
  HandleSelectChange: (isDone: boolean, idx: number) => void;
}

const DetailTodosRow: FC<Props> = ({ todo, HandleSelectChange, idx }) => {

  return (
    <Box >
      <Switch
        defaultChecked={todo.isDone}
        label={todo.title}
        onChange={() => HandleSelectChange(todo.isDone, idx)}
      />
    </Box>
  );
};

export default DetailTodosRow;