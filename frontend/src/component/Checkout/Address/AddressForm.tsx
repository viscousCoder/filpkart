import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addAddress, updateAddress } from "../../../store/addressSlice";

interface Address {
  id?: string;
  name: string;
  phonenumber: string;
  pincode: string;
  locality: string;
  com_address: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phonenumber: string;
  address_type: string;
  isActiveAddress?: boolean;
}

interface Props {
  initialData?: Address; // If provided, form is in edit mode
  onSave: (address: Address) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("id") ?? "";

  const [formData, setFormData] = useState<Address>({
    id: initialData?.id,
    name: initialData?.name || "",
    phonenumber: initialData?.phonenumber || "",
    pincode: initialData?.pincode || "",
    locality: initialData?.locality || "",
    com_address: initialData?.com_address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    landmark: initialData?.landmark || "",
    alternate_phonenumber: initialData?.alternate_phonenumber || "",
    address_type: initialData?.address_type || "Home",
  });

  // Update form data if editing a different address
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
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
    <Box sx={{ p: 3, border: "1px solid #ddd", borderRadius: 2, mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        {initialData ? "EDIT ADDRESS" : "ADD A NEW ADDRESS"}
      </Typography>

      <Button variant="contained" sx={{ mt: 2 }}>
        Use my current location
      </Button>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          fullWidth
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="phonenumber"
          label="10-digit mobile number"
          value={formData.phonenumber}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          fullWidth
          name="pincode"
          label="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="locality"
          label="Locality"
          value={formData.locality}
          onChange={handleChange}
        />
      </Box>

      <TextField
        fullWidth
        name="com_address"
        label="Address (Area and Street)"
        multiline
        rows={2}
        value={formData.com_address}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          fullWidth
          name="city"
          label="City/District/Town"
          value={formData.city}
          onChange={handleChange}
        />
        <Select
          fullWidth
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <MenuItem value="">--Select State--</MenuItem>
          <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
          <MenuItem value="Telangana">Telangana</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          fullWidth
          name="landmark"
          label="Landmark (Optional)"
          value={formData.landmark}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="alternate_phonenumber"
          label="Alternate Phone (Optional)"
          value={formData.alternate_phonenumber}
          onChange={handleChange}
        />
      </Box>

      <RadioGroup
        name="address_type"
        value={formData.address_type}
        onChange={handleChange}
        row
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          value="Home"
          control={<Radio />}
          label="Home (All day delivery)"
        />
        <FormControlLabel
          value="Work"
          control={<Radio />}
          label="Work (Delivery between 10 AM - 5 PM)"
        />
      </RadioGroup>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {initialData ? "SAVE CHANGES" : "SAVE AND DELIVER HERE"}
      </Button>
      <Button variant="text" onClick={onCancel} sx={{ mt: 2, ml: 2 }}>
        CANCEL
      </Button>
    </Box>
  );
};

export default AddressForm;
