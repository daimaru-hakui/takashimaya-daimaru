import React from "react";
import { Paper } from "@mantine/core";
import ContactsArea from "./components/contacts-area";

const ContactAll = () => {
  return (
    <Paper shadow="md" radius="md" maw={700} mx="auto">
      <ContactsArea />
    </Paper>
  );
};

export default ContactAll;
