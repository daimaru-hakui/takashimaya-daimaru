"use client";
import React, { useEffect, useState } from "react";
import { Box, Table } from "@mantine/core";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Contact } from "@/types";
import ContactsTableRow from "./contacts-table-row";

const ContactsTable = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      const coll = collection(db, "contacts");
      const q = query(coll, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapShot) => {
        setContacts(
          snapShot.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
              } as Contact)
          )
        );
      });
    };
    getContacts();
  }, []);

  return (
    <Box style={{ overflow: "auto" }}>
      <Table mt={24} w="100%" miw={600}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={110}>登録日</Table.Th>
            <Table.Th w={250}>案件名</Table.Th>
            <Table.Th w={120}>納期</Table.Th>
            <Table.Th w={120}>回答期限</Table.Th>
            <Table.Th>詳細</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {contacts.map((contact) => (
            <ContactsTableRow key={contact.id} contact={contact} />
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default ContactsTable;
