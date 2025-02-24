import React, { useState } from "react";
import { Grid, Card, Typography, Box, TextField, Button } from "@mui/material";
import { SEND_MESSAGE } from "../../graphql/Mutation";
import { useMutation } from "@apollo/client";

const ContactForm = () => {
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let isValid = true;
    let errorMessages = {
      name: "",
      email: "",
      message: "",
    };

    // Check if fields are empty
    if (!formData.name) {
      errorMessages.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      errorMessages.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessages.email = "Email is not valid";
      isValid = false;
    }

    if (!formData.message) {
      errorMessages.message = "Message is required";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await sendMessage({
        variables: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });
      console.log("Response:", response.data.sendMessage);

      console.log("Form Data:", formData);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ p: 3, bgcolor: "#f9f9f9" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Contact Form
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            error={!!errors.message}
            helperText={errors.message}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#2962ff" }}
            type="submit"
          >
            Send Message
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default ContactForm;
