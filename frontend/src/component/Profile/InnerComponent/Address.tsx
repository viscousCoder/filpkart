import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddressForm, { Address as CustomAddress } from "./AddressForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.tsx";
import {
  deleteAddress,
  fetchUserAddresses,
} from "../../../store/addressSlice.tsx";
import Loading from "../../Loading/Loading.tsx";

const Address: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, addresses: data } = useSelector(
    (state: RootState) => state.address
  );
  const [addresses, setAddresses] = useState<CustomAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomAddress | null>(
    null
  );
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const userId: string | null = localStorage.getItem("id");
    if (userId)
      dispatch(
        fetchUserAddresses({ rejectValue: "Failed to fetch addresses" })
      );

    //  dispatch(fetchUserAddresses());
    setAddresses(data);
  }, [toggle, dispatch]);

  useEffect(() => {
    setAddresses(data);
  }, [loading]);

  // Open Menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedAddressId(id);
  };

  // Close Menu
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedAddressId(null);
  };

  // Handle Delete
  const handleDelete = async () => {
    // setAddresses(addresses.filter((addr) => addr.id !== selectedAddressId));
    await dispatch(deleteAddress({ addressId: selectedAddressId! }));
    handleMenuClose();
    setToggle((prev) => !prev);
  };

  // Handle Edit
  const handleEdit = () => {
    const addressToEdit = addresses.find(
      (addr) => addr.id === selectedAddressId
    );
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setShowForm(true);
    }
    handleMenuClose();
  };

  // Handle Save (Add or Edit)
  const handleSave = (newAddress: CustomAddress) => {
    if (newAddress.id) {
      // Edit Existing Address
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === newAddress.id ? newAddress : addr))
      );
    } else {
      // Add New Address
      const id = new Date().getTime().toString(); // Unique ID
      setAddresses([{ ...newAddress, id }, ...addresses]);
    }
    setShowForm(false);
    setEditingAddress(null);
    setToggle((prev) => !prev);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Box p={3} bgcolor="#F5F5F5" minHeight="100vh">
          {/* Header */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Manage Addresses
          </Typography>

          {/* Add Address Button */}
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mb: 3 }}
            fullWidth
            onClick={() => setShowForm(true)}
          >
            + Add a New Address
          </Button>

          {/* Address Form (Shows on Add/Edit) */}
          {showForm && (
            <AddressForm
              initialData={editingAddress}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingAddress(null);
              }}
            />
          )}

          {/* Address List */}
          {data.map((addr) => (
            <Card key={addr.id} sx={{ mb: 2, position: "relative" }}>
              <CardContent>
                {/* Address Type Chip */}
                <Chip
                  label={addr.address_type}
                  color={addr.address_type === "HOME" ? "primary" : "secondary"}
                  size="small"
                />

                {/* Name & Phone */}
                <Box display="flex" justifyContent="space-between" mt={0.5}>
                  <Typography fontWeight="bold">{addr.name}</Typography>
                  <Typography fontWeight="bold">{addr.phonenumber}</Typography>
                </Box>

                {/* Address & Pincode */}
                <Typography mt={1} color="text.secondary">
                  {addr.com_address} - <b>{addr.pincode}</b>
                </Typography>

                {/* More Options (Edit/Delete) */}
                <IconButton
                  aria-label="more"
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, addr.id || "")}
                  sx={{ position: "absolute", top: 16, right: 16 }}
                >
                  <MoreVertIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}

          {/* Menu (Edit / Delete) */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Fragment>
  );
};

export default Address;
