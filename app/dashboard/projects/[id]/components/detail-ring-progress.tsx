import { RingProgress, Text } from '@mantine/core';
import React, { FC } from 'react';

interface Props {
  value: number;
}

const DetailRingProgress: FC<Props> = ({ value = 0 }) => {
  return (
    <RingProgress
      size={150}
      sections={[{ value, color: 'blue' }]}
      label={
        <Text c="blue" fw={700} ta="center" size="xl">
          {value}%
        </Text>
      }
    />
  );
};

export default DetailRingProgress;