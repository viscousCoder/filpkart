import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ContactForm from "./ContactForm";

const ContactSection: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Get in Touch with Our Team
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Have questions about our products or services? Our dedicated support
            team is here to help you 24/7.
          </Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  boxShadow: 1,
                }}
              >
                <PhoneIcon color="primary" sx={{ fontSize: 30, mr: 2 }} />
                <Box>
                  <Typography fontWeight="bold">Call Us</Typography>
                  <Typography>1800-123-4567</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  boxShadow: 1,
                }}
              >
                <EmailIcon color="primary" sx={{ fontSize: 30, mr: 2 }} />
                <Box>
                  <Typography fontWeight="bold">Email Us</Typography>
                  <Typography>support@flipkart.com</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section - Contact Form */}
        {/* <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, bgcolor: "#f9f9f9" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Contact Form
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "#2962ff" }}
              >
                Send Message
              </Button>
            </Box>
          </Card>
        </Grid> */}
        <ContactForm />
      </Grid>
    </Box>
  );
};

export default ContactSection;
