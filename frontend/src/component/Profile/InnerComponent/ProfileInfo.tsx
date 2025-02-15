import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileInfo: React.FC = () => {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "Aman",
    lastName: "Bisht",
    gender: "male",
    email: "amanbisht1010@gmail.com",
    mobile: "+916396969169",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Save button)
  const handleSave = () => {
    console.log("Updated Profile Data:", formData);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <>
      <Box flex={1} p={3} bgcolor="white" boxShadow={1} mx={2} my={2}>
        <Typography variant="h6" fontWeight="bold">
          Personal Information{" "}
          <EditIcon
            sx={{ cursor: "pointer", ml: 1 }}
            onClick={() => setIsEditing(true)}
          />
        </Typography>

        {/* Personal Information Form */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Box>

        <Typography mt={2}>Your Gender</Typography>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel
            value="male"
            control={<Radio disabled={!isEditing} />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio disabled={!isEditing} />}
            label="Female"
          />
        </RadioGroup>

        <TextField
          label="Email Address"
          fullWidth
          disabled={!isEditing}
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Mobile Number"
          fullWidth
          disabled={!isEditing}
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        {/* Save Button (visible only when editing) */}
        {isEditing && (
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        )}

        {/* FAQs */}
        <Typography variant="h6" fontWeight="bold" mt={3}>
          FAQs
        </Typography>
        <Typography mt={2} fontWeight="bold">
          What happens when I update my email address (or mobile number)?
        </Typography>
        <Typography>
          Your login email id (or mobile number) changes, likewise. You’ll
          receive all your account-related communication on your updated email
          address (or mobile number).
        </Typography>

        <Typography mt={2} fontWeight="bold">
          When will my Flipkart account be updated with the new email address
          (or mobile number)?
        </Typography>
        <Typography>
          It happens as soon as you confirm the verification code sent to your
          email (or mobile) and save the changes.
        </Typography>

        <Typography mt={2} fontWeight="bold">
          What happens to my existing Flipkart account when I update my email
          address (or mobile number)?
        </Typography>
        <Typography>
          Updating your email address (or mobile number) doesn’t invalidate your
          account. Your account remains fully functional.
        </Typography>

        <Typography mt={2} fontWeight="bold">
          Does my Seller account get affected when I update my email address?
        </Typography>
        <Typography>
          Flipkart has a ‘single sign-on’ policy. Any changes will reflect in
          your Seller account also.
        </Typography>

        {/* Account Actions */}
        <Box mt={3}>
          <Button variant="text" color="primary">
            Deactivate Account
          </Button>
          <Button variant="text" color="error" sx={{ ml: 2 }}>
            Delete Account
          </Button>
        </Box>

        {/* Footer Image */}
        <Box mt={5} textAlign="center">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
            alt="Footer"
            width="80%"
          />
        </Box>
      </Box>
    </>
  );
};

export default ProfileInfo;
