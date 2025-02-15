import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ADMIN_REGISTER } from "../graphql/Mutation.tsx";
import { client } from "../main";
import { toast } from "react-toastify";
import { GET_ADMIN_USER } from "../graphql/Queries.tsx";

export interface user {
  firstname: string;
  lastname: string;
  age: number;
  phonenumber: string;
  email: string;
  password: string;
  gender: string;
  role: string;
}
export interface adminLogin {
  email: string;
  password: string;
}
export const createAdminUser = createAsyncThunk(
  "user/createUser",
  async (
    { userData, navigate }: { userData: user; navigate: any },
    { rejectWithValue }
  ) => {
    // const processedUserData = {
    //   ...userData,
    //   age: Number(userData.age),
    // };

    try {
      const { data } = await client.mutate({
        mutation: ADMIN_REGISTER,
        variables: userData,
      });
      toast.success(data.createAdmin.message);
      navigate("/admin/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Create the login thunk
export const loginAdminUser = createAsyncThunk(
  "/admin/login",
  async (
    { userData, navigate }: { userData: adminLogin; navigate: any },
    { rejectWithValue }
  ) => {
    const { email, password } = userData;
    try {
      const { data } = await client.query({
        query: GET_ADMIN_USER,
        variables: { email, password },
      });

      toast.success("Login successful");
      navigate("/");
      localStorage.setItem("token", data.loginAdmin.token);
      localStorage.setItem("role", data.loginAdmin.user.role);
      return data.loginAdmin;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login");
        return rejectWithValue(error.message || "Something went wrong");
      }
      toast.error("An unexpected error occurred");
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdminUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })
      .addCase(loginAdminUser.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export default adminSlice.reducer;
