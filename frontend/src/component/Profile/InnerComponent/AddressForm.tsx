import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addAddress, updateAddress } from "../../../store/addressSlice";

interface Address {
  id?: string;
  address_type: "HOME" | "WORK";
  name: string;
  phonenumber: string;
  com_address: string;
  pincode: string;
  locality: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phonenumber: string;
}

interface AddressFormProps {
  initialData?: Address | null;
  onSave: (address: Address) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) =>
  //   {
  //   initialData,
  //   onSave,
  //   onCancel,
  // }
  {
    const dispatch = useDispatch<AppDispatch>();
    const userId = localStorage.getItem("id") ?? "";
    const [formData, setFormData] = useState<Address>(
      initialData || {
        address_type: "HOME",
        name: "",
        phonenumber: "",
        com_address: "",
        pincode: "",
        locality: "",
        city: "",
        state: "",
        landmark: "",
        alternate_phonenumber: "",
      }
    );

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (initialData) {
        await dispatch(
          updateAddress({
            id: String(initialData?.id),
            userId: userId,
            addressData: formData,
          })
        );
      } else {
        await dispatch(addAddress({ userId: userId, addressData: formData }));
      }
      onSave(formData);
    };

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          bgcolor: "#f0f6ff", // Light blue background
          borderRadius: 2,
          boxShadow: 1,
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {initialData ? "EDIT ADDRESS" : "ADD A NEW ADDRESS"}
        </Typography>

        {/* Use Current Location Button */}
        <Button
          variant="contained"
          startIcon={<MyLocationIcon />}
          fullWidth
          sx={{ mb: 2, bgcolor: "#1565C0", textTransform: "none" }}
        >
          Use my current location
        </Button>

        {/* Name & Phone Fields */}
        <Box display="flex" gap={2}>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="10-digit mobile number"
            fullWidth
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Pincode & Locality */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Pincode"
            fullWidth
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          <TextField
            label="Locality"
            fullWidth
            name="locality"
            value={formData.locality}
            onChange={handleChange}
          />
        </Box>

        {/* Address */}
        <TextField
          label="Address (Area and Street)"
          fullWidth
          name="com_address"
          value={formData.com_address}
          onChange={handleChange}
          sx={{ mt: 2 }}
          required
        />

        {/* City & State */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="City/District/Town"
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="State"
            fullWidth
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <MenuItem value="">--Select State--</MenuItem>
            <MenuItem value="Telangana">Uttarakhand</MenuItem>
            <MenuItem value="Karnataka">Uttar Pardesh</MenuItem>
            <MenuItem value="Maharashtra">Delhi</MenuItem>
            {/* Add more states here */}
          </TextField>
        </Box>

        {/* Landmark & Alternate Phone */}
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Landmark (Optional)"
            fullWidth
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
          <TextField
            label="Alternate Phone (Optional)"
            fullWidth
            name="alternate_phonenumber"
            value={formData.alternate_phonenumber}
            onChange={handleChange}
          />
        </Box>

        {/* Address Type */}
        <Typography variant="body1" mt={2}>
          Address Type
        </Typography>
        <RadioGroup
          row
          value={formData.address_type}
          onChange={(e) =>
            setFormData({
              ...formData,
              address_type: e.target.value as "HOME" | "WORK",
            })
          }
        >
          <FormControlLabel value="Home" control={<Radio />} label="Home" />
          <FormControlLabel value="Work" control={<Radio />} label="Work" />
        </RadioGroup>

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{ bgcolor: "#1565C0", textTransform: "none", px: 5 }}
          >
            Save
          </Button>
          <Button variant="text" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

export default AddressForm;
