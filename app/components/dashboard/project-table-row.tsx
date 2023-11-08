import { Button, Table } from "@mantine/core";
import React from "react";

const ProjectTableRow = () => {
  return (
    <Table.Tr >
      <Table.Td>大丸白衣</Table.Td>
      <Table.Td>向井</Table.Td>
      <Table.Td>500万</Table.Td>
      <Table.Td>2023-11-6</Table.Td>
      <Table.Td>70%</Table.Td>
      <Table.Td>提案中</Table.Td>
      <Table.Td><Button>詳細</Button></Table.Td>
    </Table.Tr>
  );
};

export default ProjectTableRow;
