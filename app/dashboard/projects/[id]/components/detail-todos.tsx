import { db } from '@/firebase/client';
import { Project } from '@/types';
import { Box, Divider, Flex, Stack, Switch } from '@mantine/core';
import { doc, updateDoc } from 'firebase/firestore';
import React, { FC, useCallback, useEffect, useState } from 'react';
import DetailRingProgress from './detail-ring-progress';
import DetailTodosRow from './detail-todos-row';

interface Props {
  project: Project;
}

const DetailTodo: FC<Props> = ({ project }) => {
  const [progressRate, setProgressRate] = useState(0);

  const calcProgressRate = useCallback(() => {
    const total = project.todos?.length || 0;
    const filterTodos = project.todos?.filter((todo) => (
      todo.isDone === true
    ));
    const rate = Math.round(Number(filterTodos?.length) / total * 100);
    setProgressRate(rate);
  }, [project.todos]);

  useEffect(() => {
    calcProgressRate();
  }, [calcProgressRate]);

  const HandleSelectChange = (isDone: boolean, idx: number) => {
    const todos = project.todos;
    const newTodos = todos.map((todo, index) => (
      index === idx ? { title: todo.title, isDone: !isDone } : todo
    ));
    const docRef = doc(db, "projects", `${project.id}`);

    updateDoc(docRef, {
      todos: [...newTodos]
    });
  };

  return (
    <>
      {project.todos?.length > 0 && (
        <>
          <Divider my="sm" />
          <Box>進捗状況</Box>
          <Flex justify="space-between">
            <Stack gap={12} mt="sm">
              {project?.todos?.map((todo, idx) => (
                <DetailTodosRow
                  key={idx}
                  todo={todo}
                  HandleSelectChange={HandleSelectChange}
                  idx={idx}
                />
              ))}
            </Stack>
            <Box>
              <DetailRingProgress value={progressRate} />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default DetailTodo;