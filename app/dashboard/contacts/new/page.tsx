import React from "react";
import ContactForm from "../components/contact-form";
import { Container, Paper } from "@mantine/core";

const ContactNew = () => {
  return (
    <Container maw={500}>
      <Paper w="100%" shadow="md" bg="white">
        <ContactForm />
      </Paper>
    </Container>
  );
};

export default ContactNew;
