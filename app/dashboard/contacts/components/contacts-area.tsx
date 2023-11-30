import React from "react";
import { Container, Title, Flex, Button } from "@mantine/core";
import ContactsTable from "./contacts-table";
import Link from "next/link";

const ContactsArea = () => {
  return (
    <Container w="100%" p="lg">
      <Flex justify="space-between" align="center">
        <Title order={2}>案件依頼一覧</Title>
        <Flex gap="md">
          <Link href="/dashboard">
            <Button variant="outline" size="xs">
              トップページへ
            </Button>
          </Link>
          <Link href="/dashboard/contacts/new">
            <Button size="xs">作成</Button>
          </Link>
        </Flex>
      </Flex>
      <ContactsTable />
    </Container>
  );
};

export default ContactsArea;
