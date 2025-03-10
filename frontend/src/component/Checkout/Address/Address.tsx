import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "./AddressForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.tsx";
import { fetchUserAddresses } from "../../../store/addressSlice.tsx";
import Loading from "../../Loading/Loading.tsx";
// import { Address } from "../../interfaceTypes/interfaceTypes.tsx";

// export interface AddressInter {
//   name: string;
//   id: string | undefined;
//   phonenumber: string;
//   pincode: string;
//   locality: string;
//   com_address: string;
//   city: string;
//   state: string;
//   landmark: string;
//   alternate_phonenumber: string;
//   address_type: string;
//   isActiveAddress?: boolean;
// }
interface Address {
  id?: string; // Optional in API, but you'll handle this in UI
  name: string;
  phonenumber: string;
  pincode: string;
  locality: string;
  com_address: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phonenumber: string;
  address_type: "HOME" | "WORK"; // Enforce correct types
  isActiveAddress?: boolean; // Optional from API
}

const Address: React.FC<{
  onContinue: () => void;
  onSelectAddress: (address: Address) => void;
}> = ({ onContinue, onSelectAddress }) => {
  const { loading, addresses: data } = useSelector(
    (state: RootState) => state.address
  );
  const dispatch = useDispatch<AppDispatch>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  // addresses[0];
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUserAddresses({ rejectValue: "Failed to fetch addresses" }));
    setAddresses(data);
  }, [toggle, dispatch]);

  useEffect(() => {
    setAddresses(data);
    data.map((item) =>
      item.isActiveAddress ? setSelectedAddress(item.id || "") : ""
    );
  }, [loading]);

  const handleSelect = (id: string) => {
    const newSelectedAddress = addresses.find((addr) => addr.id === id);
    if (newSelectedAddress) {
      setSelectedAddress(newSelectedAddress?.id || "");
      onSelectAddress(newSelectedAddress);
    } else {
      setSelectedAddress(id);
      setEditingAddress(null);
    }
  };

  const handleAddAddress = (newAddress: Address) => {
    setAddresses([newAddress, ...addresses]);
    setSelectedAddress(newAddress?.id || "");
    setIsAddingNew(false);
  };

  const handleEditAddress = () => {
    setToggle((prev) => !prev);
    setEditingAddress(null);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <RadioGroup
            value={selectedAddress}
            onChange={(e) => handleSelect(e.target.value)}
          >
            {(showAll ? addresses : addresses.slice(0, 2)).map((address) => (
              <Box
                key={address.id}
                sx={{
                  padding: "10px 0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {editingAddress && editingAddress.id === address.id ? (
                  <AddressForm
                    initialData={editingAddress}
                    onSave={handleEditAddress}
                    onCancel={() => setEditingAddress(null)}
                  />
                ) : (
                  <>
                    <FormControlLabel
                      sx={{ width: "100%" }}
                      value={address.id}
                      control={<Radio color="primary" />}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography variant="body1">
                              <b>{address.name}</b>{" "}
                              <span
                                style={{
                                  background: "#eee",
                                  padding: "2px 5px",
                                  fontSize: "12px",
                                }}
                              >
                                {address.address_type}
                              </span>{" "}
                              <b>{address.phonenumber}</b>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {address.com_address} - <b>{address.pincode}</b>
                            </Typography>
                          </Box>
                          {selectedAddress === address.id && (
                            //
                            <Typography
                              sx={{
                                cursor: "pointer",
                                color: "#1976D2",
                                fontWeight: 600,
                              }}
                              onClick={() => setEditingAddress(address)}
                            >
                              Edit
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    {selectedAddress === address.id && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          marginTop: 1,
                          background: "#ff5722",
                          width: "35%",
                        }}
                        onClick={onContinue}
                      >
                        DELIVER HERE
                      </Button>
                    )}
                  </>
                )}
              </Box>
            ))}
          </RadioGroup>

          {/* Toggle for viewing all addresses */}
          {addresses.length > 2 && (
            <Typography
              sx={{
                cursor: "pointer",
                color: "#1976D2",
                fontWeight: 600,
                marginTop: 1,
              }}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Hide" : `View all ${addresses.length} addresses`}
            </Typography>
          )}

          {/* Add New Address Button */}
          {!isAddingNew && !editingAddress && (
            <Typography
              sx={{
                cursor: "pointer",
                color: "#1976D2",
                fontWeight: 600,
                marginTop: 2,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setIsAddingNew(true)}
            >
              <AddIcon sx={{ marginRight: 1 }} /> Add a new address
            </Typography>
          )}

          {/* Add Address Form (Opens Below the List) */}
          {isAddingNew && (
            <AddressForm
              onSave={handleAddAddress}
              onCancel={() => setIsAddingNew(false)}
            />
          )}
        </>
      )}
    </Fragment>
  );
};

export default Address;

// const initialAddresses: Address[] = [
//   {
//     id: 1,
//     name: "Aman Bisht",
//     phone: "6396969169",
//     type: "HOME",
//     details: "98, Basai perrumadara, Ramnagar, Uttarakhand",
//     pincode: "244715",
//   },
//   {
//     id: 2,
//     name: "Tarun Rawat",
//     phone: "8433411658",
//     type: "HOME",
//     details: "100, Lakhanpur Chungi, Ramnagar, Uttarakhand",
//     pincode: "244715",
//   },
//   {
//     id: 3,
//     name: "Aman Bisht",
//     phone: "6396969169",
//     type: "HOME",
//     details: "205, Lifestyle Luxury PG, Hyderabad, Telangana",
//     pincode: "500084",
//   },
// ];
