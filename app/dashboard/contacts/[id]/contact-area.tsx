import React, { FC } from "react";
import {
  Container,
  Title,
  Stack,
  Box,
  Flex,
  Badge,
  Button,
} from "@mantine/core";
import { Contact } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  contact: Contact;
}

const ContactArea: FC<Props> = ({ contact }) => {
  return (
    <Container w="100%" p="lg">
      <Stack gap="lg">
        {contact.inquiryType === "ESTIMATE" ? (
          <Badge color="violet" w="100%">
            見積
          </Badge>
        ) : (
          <Badge color="orange" w="100%">
            提案書
          </Badge>
        )}
        <Flex justify="space-between" align="center">
          <Title order={2}>詳細</Title>
          <Link href="/dashboard/contacts">
            <Button size="xs" variant="outline">
              一覧へ
            </Button>
          </Link>
        </Flex>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w="100%">
            <Box fw="bold" fz="sm">
              案件名
            </Box>
            <Box>{contact.title}</Box>
          </Box>
          <Box w="100%">
            <Box fw="bold" fz="sm">
              回答期日
            </Box>
            <Box>{contact.responseDeadline}</Box>
          </Box>
        </Flex>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w="100%">
            <Box fw="bold" fz="sm">
              種別
            </Box>
            <Box>{contact.orderType === "READY" ? "既製品" : "別注"}</Box>
          </Box>
          <Box w="100%" mt={{ base: "lg", md: 0 }}>
            <Box fw="bold" fz="sm">
              納期
            </Box>
            <Box>{contact.deadline}</Box>
          </Box>
        </Flex>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w="100%">
            <Box fw="bold" fz="sm">
              対象人数（人）
            </Box>
            <Box>{contact.numberOfPeople}人</Box>
          </Box>
          <Box w="100%" mt={{ base: "lg", md: 0 }}>
            <Box fw="bold" fz="sm">
              1人あたり支給枚数
            </Box>
            <Box>{contact.quantityPerPerson}枚</Box>
          </Box>
        </Flex>
        <Box>
          <Box fw="bold" fz="sm">
            内容
          </Box>
          <Box>{contact.content}</Box>
        </Box>
        <Box>
          {contact?.images?.map((image) => (
            <Box key={image.url}>
              {image.type === "application/pdf" ? (
                <Link
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  {image.name}
                </Link>
              ) : (
                <Image
                  src={image.url}
                  width={200}
                  height={200}
                  alt={image.name}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </Box>
          ))}
        </Box>
        <Flex align="center" justify="flex-end" gap="md">
          <Box fz="sm">投稿者</Box>
          <Box>{contact.user?.email}</Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default ContactArea;
