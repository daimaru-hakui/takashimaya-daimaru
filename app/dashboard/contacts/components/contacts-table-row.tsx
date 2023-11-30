"use client";
import { Contact } from "@/types";
import { Table, Button, Flex } from "@mantine/core";
import React, { FC } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase/client";
import { deleteObject, ref } from "firebase/storage";

interface Props {
  contact: Contact;
}

const ContactsTableRow: FC<Props> = ({ contact }) => {
  const removeContact = async (id: string) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;

    const docRef = doc(db, "contacts", contact.id);
    try {
      await deleteDoc(docRef);
      if (contact.images?.length === 0 || !contact.images) return;
      for (let { path } of contact.images) {
        await deleteImage(path);
      }
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました。");
    }
  };

  const deleteImage = async (path: string) => {
    const desertRef = ref(storage, path);
    await deleteObject(desertRef);
  };

  return (
    <Table.Tr>
      <Table.Td w={100}>
        {format(new Date(contact.createdAt.toDate()), "yyyy-MM-dd")}
      </Table.Td>
      <Table.Td>{contact?.title}</Table.Td>
      <Table.Td>{contact.deadline}</Table.Td>
      <Table.Td>{contact.responseDeadline}</Table.Td>
      <Table.Td>
        <Flex align="center" gap="md">
          <Link href={`/dashboard/contacts/${contact.id}`}>
            <Button size="xs">詳細</Button>
          </Link>
          <AiOutlineDelete
            style={{ cursor: "pointer", fontSize: 20 }}
            onClick={() => removeContact(contact.id)}
          />
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};

export default ContactsTableRow;
