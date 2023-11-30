import React from "react";
import ContactArea from "./contact-area";
import { Paper } from "@mantine/core";
import { db } from "@/firebase/server";
import { Contact } from "@/types";

const ContactById = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const getContact = async (id: string) => {
    const contactRef = db.collection("contacts").doc(id);
    const doc = await contactRef.get();
    if (!doc.exists) {
      console.log("no such document");
    } else {
      const userRef = doc.data()?.createdBy?.ref;
      const userDoc = await userRef?.get();
      const data: any = { ...doc.data(), id: doc.id, user: userDoc?.data() };
      return data;
    }
  };

  const contact: Contact = await getContact(id);
console.log(contact)
  if (!contact) return;

  return (
    <Paper shadow="md" radius="md" maw={700} mx="auto">
      <ContactArea contact={contact} />
    </Paper>
  );
};

export default ContactById;
