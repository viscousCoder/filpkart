import { Container } from "@mui/material";
import React from "react";
import ContactSection from "../../component/Contact/Contact";
import DownContact from "../../component/Contact/DownContactSection";

const ConatctPage = () => {
  return (
    <Container sx={{ background: "white", mt: 3, pb: 3 }}>
      <ContactSection />
      <DownContact />
    </Container>
  );
};

export default ConatctPage;
