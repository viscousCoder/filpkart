import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import Address from "../component/Checkout/Address/Address";
import { GET_SINGLE_ADDRESS, GET_USER_ADDRESSES } from "../graphql/Queries";
import { client } from "../main";
import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  SET_ACTIVE_ADDRESS,
  UPDATE_ADDRESS,
} from "../graphql/Mutation";
import { toast } from "react-toastify";
import { Address } from "../component/interfaceTypes/interfaceTypes";

// Fetch user addresses
export const fetchUserAddresses = createAsyncThunk<
  Address[],
  { rejectValue: string }
>("address/fetchUserAddresses", async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  try {
    const response = await client.query({
      query: GET_USER_ADDRESSES,
      variables: { userId },
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
      fetchPolicy: "no-cache",
    });

    return response.data.getUserAddresses;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("An error occurred during login");
      console.log("error", error);
      return error.message;
    }
  }
});

//fetch single address
export const fetchSingleAddress = createAsyncThunk<
  Address,
  { userId: string; addressId: string },
  { rejectValue: string }
>(
  "address/fetchSingleAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await client.query({
        query: GET_SINGLE_ADDRESS,
        variables: { userId, addressId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: "no-cache",
      });

      return response.data.getSingleAddress;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("An error occurred during login");
        console.log("error", error);
        return rejectWithValue("Failed to fetch address");
      }
    }
  }
);

//update address
export const updateAddress = createAsyncThunk<
  Address,
  { id: string; userId: string; addressData: Partial<Address> },
  { rejectValue: string }
>(
  "address/updateAddress",
  async ({ id, userId, addressData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await client.mutate({
        mutation: UPDATE_ADDRESS,
        variables: { id, userId, ...addressData },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.updateAddress;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("An error occurred during login");
        console.log("error", error);
        return rejectWithValue("Failed to update address");
      }
    }
  }
);

//delete
export const deleteAddress = createAsyncThunk<
  string,
  { addressId: string },
  { rejectValue: string }
>("address/deleteAddress", async ({ addressId }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  try {
    const response = await client.mutate({
      mutation: DELETE_ADDRESS,
      variables: { addressId, userId },
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
    });
    toast.success(response.data.deleteAddress.message);
    return response.data.deleteAddress.message;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("An error occurred during login");
      console.log("error", error);
      return rejectWithValue("Failed to delete address");
    }
  }
});

// Add new address
export const addAddress = createAsyncThunk<
  Address,
  { userId: string; addressData: Omit<Address, "id" | "isActiveAddress"> },
  { rejectValue: string }
>(
  "address/addAddress",
  async ({ userId, addressData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await client.mutate({
        mutation: ADD_ADDRESS,
        variables: { userId, ...addressData },
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
      });

      return response.data.addAddress;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Set active address
export const setActiveAddress = createAsyncThunk<
  Address,
  { userId: string; addressId: string },
  { rejectValue: string }
>(
  "address/setActiveAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    const token = "ajshdkjash";
    try {
      const response = await client.mutate({
        mutation: SET_ACTIVE_ADDRESS,
        variables: { userId, addressId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      return response.data.setActiveAddress;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Initial state
const initialState = {
  addresses: [] as Address[],
  loading: false,
  error: "",
};

// Address slice
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user addresses
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchUserAddresses.fulfilled,
        (state, action: PayloadAction<Address[]>) => {
          state.loading = false;
          state.addresses = action.payload;
        }
      )
      .addCase(fetchUserAddresses.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch addresses";
      })

      // Add address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.loading = false;
        // state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add address";
      })

      // Set active address
      .addCase(setActiveAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setActiveAddress.fulfilled,
        (state, action: PayloadAction<Address>) => {
          state.loading = false;
          state.addresses = state.addresses.map((address) =>
            address.id === action.payload.id
              ? { ...address, isActiveAddress: true }
              : { ...address, isActiveAddress: false }
          );
        }
      )
      .addCase(setActiveAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to set active address";
      })

      // Fetch single address
      .addCase(fetchSingleAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleAddress.fulfilled, (state) => {
        state.loading = false;
        // state.selectedAddress = action.payload;
      })
      .addCase(fetchSingleAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch address";
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      // .addCase(
      //   updateAddress.fulfilled,
      //   (state, action: PayloadAction<Address>) => {
      //     // state.loading = false;
      //     // state.addresses = state.addresses.map((addr) =>
      //     //   addr.id === action.payload.id ? action.payload : addr
      //     // );
      //   }
      // )
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update address";
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      // .addCase(
      //   deleteAddress.fulfilled,
      //   (state, action: PayloadAction<string>) => {
      //     // state.loading = false;
      //     // state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
      //   }
      // )
      .addCase(deleteAddress.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete address";
      });
  },
});

export default addressSlice.reducer;
